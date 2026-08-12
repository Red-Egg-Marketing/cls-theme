<?php
/**
 * CLS Gravity Forms customizations
 *
 * Updated for Gravity Forms 3.0. PHP-level changes only — emitted markup is
 * unchanged from the original:
 *  - Dynamic choices registered on the full hook set (state validation + async).
 *  - No reliance on $post inside render/validation/notification filters.
 *  - cssClass matched by token, not exact string.
 *  - PHP 8.4 safe (no wp_list_pluck on false, no property access on null).
 *  - Attribute values escaped.
 */

/*
 *  ┌──────────────┐
 *  │   HELPERS    │
 *  └──────────────┘
 */

/**
 * True when a GF field's cssClass contains the given class as its own token.
 */
function cls_field_has_class( $field, $class ) {
    $classes = preg_split( '/\s+/', (string) $field->cssClass, -1, PREG_SPLIT_NO_EMPTY );

    return in_array( $class, $classes, true );
}

/**
 * ID of the post the form is currently being rendered on, or 0.
 */
function cls_current_post_id() {
    return is_singular() ? (int) get_queried_object_id() : 0;
}


/*
 *  ┌──────────────────────────┐
 *  │   VEHICLE SELECTOR       │
 *  └──────────────────────────┘
 */

/**
 * Set the parameter name and push the vehicle-selector class into size, which
 * is what gets written out as the input's class attribute below.
 */
function cls_add_class_vehicle_selector( $form ) {
    foreach ( $form['fields'] as $field ) {
        if ( $field->type === 'text' && cls_field_has_class( $field, 'vehicle-selector' ) ) {
            $field->inputName = 'VehicleSelector';
            $field->size      = $field->size . ' vehicle-selector';
        }
    }

    return $form;
}
add_filter( 'gform_pre_render', 'cls_add_class_vehicle_selector' );

/**
 * Render the vehicle selector, prefilled when embedded on a vehicle single.
 */
function cls_add_oninput( $input, $field, $value, $lead_id, $form_id ) {
    if ( $field->type !== 'text' || ! cls_field_has_class( $field, 'vehicle-selector' ) ) {
        return $input;
    }

    $value   = '';
    $post_id = cls_current_post_id();

    if ( $post_id && get_post_type( $post_id ) === 'vehicle' ) {
        $car   = get_the_title( $post_id );
        $stock = get_post_meta( $post_id, 'stock', true );

        $year_terms = get_the_terms( $post_id, 'car_year' );
        $year       = ( ! is_wp_error( $year_terms ) && ! empty( $year_terms ) )
            ? implode( ', ', wp_list_pluck( $year_terms, 'name' ) )
            : '';

        $value = $stock . ', ' . $car . ' ' . $year;
    }

    $classes = $field->size;
    $name    = 'input_' . $field->id;

    $input = '<input type="hidden" class="' . esc_attr( $classes ) . '" name="' . esc_attr( $name ) . '" id="VehicleSelector_' . $form_id . '_' . '_' . $field->id . '" value="' . esc_attr( $value ) . '" tabindex="0" />';

    return $input;
}
add_filter( 'gform_field_input', 'cls_add_oninput', 10, 5 );


/*
 *  ┌──────────────────────────┐
 *  │   PREFERRED CONSULTANT   │
 *  └──────────────────────────┘
 */

/**
 * Populate the preferred consultant select with the sales team.
 *
 * Must run on every context GF evaluates the form in, or 3.0 state validation
 * rejects the submitted choice: render, validation, submission, admin, async.
 */
function cls_populate_member_dropdown( $form, $entry = null ) {
    $current_id = cls_current_post_id();

    foreach ( $form['fields'] as $field ) {
        if ( $field->type !== 'select' || ! cls_field_has_class( $field, 'preferred-consultant' ) ) {
            continue;
        }

        $bio_query = new WP_Query( [
            'post_type'      => 'gs_team',
            'post_status'    => 'publish',
            'posts_per_page' => -1,
            'orderby'        => 'title',
            'order'          => 'ASC',
            'no_found_rows'  => true,
            'tax_query'      => [
                [
                    'taxonomy' => 'gs_team_group',
                    'field'    => 'slug',
                    'terms'    => 'sales',
                ],
            ],
        ] );

        $items = [
            [
                'text'  => 'No Preference',
                'value' => 'no preference',
            ],
        ];

        foreach ( $bio_query->posts as $bio ) {
            $contact_id = get_post_meta( $bio->ID, 'contact_id', true );

            $value = $contact_id
                ? $contact_id . ', ' . $bio->post_title . ', ' . $bio->ID
                : $bio->post_title . ', ' . $bio->ID;

            $items[] = [
                'value'      => $value,
                'text'       => $bio->post_title,
                'isSelected' => $current_id === (int) $bio->ID,
            ];
        }

        $field->choices = $items;
    }

    return $form;
}
add_filter( 'gform_pre_render', 'cls_populate_member_dropdown' );
add_filter( 'gform_pre_validation', 'cls_populate_member_dropdown' );
add_filter( 'gform_pre_submission_filter', 'cls_populate_member_dropdown' );
add_filter( 'gform_admin_pre_render', 'cls_populate_member_dropdown' );
add_filter( 'gform_form_pre_process_async_task', 'cls_populate_member_dropdown', 10, 2 );


/*
 *  ┌──────────────────────────┐
 *  │   READONLY TEXT FIELD    │
 *  └──────────────────────────┘
 */

/**
 * Render fields flagged gf_readonly as readonly text inputs.
 */
function cls_add_readonly( $input, $field, $value, $lead_id, $form_id ) {
    if ( $field->type !== 'text' || ! cls_field_has_class( $field, 'gf_readonly' ) ) {
        return $input;
    }

    $classes = $field->size;
    $name    = 'input_' . $field->id;

    $input = '<input type="text" class="' . esc_attr( $classes ) . '" name="' . esc_attr( $name ) . '" id="' . $form_id . '_' . '_' . $field->id . '" readonly="readonly" tabindex="0" />';

    return $input;
}
add_filter( 'gform_field_input', 'cls_add_readonly', 10, 5 );


/*
 *  ┌──────────────────────────────┐
 *  │   CONDITIONAL REQUIREMENT    │
 *  └──────────────────────────────┘
 */

/**
 * Make conditional-dep fields required when field 9 is empty.
 *
 * Scoped so it only touches forms that actually contain field 9 — this used to
 * run against every form on the site.
 */
function cls_set_conditional_requirement( $form ) {
    $has_trigger = false;
    $targets     = [];

    foreach ( $form['fields'] as $field ) {
        if ( (int) $field->id === 9 ) {
            $has_trigger = true;
        }

        if ( cls_field_has_class( $field, 'conditional-dep' ) ) {
            $targets[] = $field;
        }
    }

    if ( ! $has_trigger || empty( $targets ) ) {
        return $form;
    }

    if ( rgpost( 'input_9' ) === '' ) {
        foreach ( $targets as $field ) {
            $field->isRequired = true;
        }
    }

    return $form;
}
add_filter( 'gform_pre_render', 'cls_set_conditional_requirement' );
add_filter( 'gform_pre_validation', 'cls_set_conditional_requirement' );


/*
 *  ┌──────────────────────────┐
 *  │   NOTIFICATIONS          │
 *  └──────────────────────────┘
 */

/**
 * CC the selected consultant and note where the form was embedded.
 *
 * Reads context from the entry, not $post — notifications may be processed
 * asynchronously with no page context available.
 */
function cls_notify_consultant( $notification, $form, $entry ) {
    $post_id   = (int) rgar( $entry, 'post_id' );
    $post_type = $post_id ? get_post_type( $post_id ) : '';

    $title = 'Website';

    if ( $post_type === 'vehicle' ) {
        $title = 'Inventory';
    } elseif ( $post_type === 'gs_team' ) {
        $title = 'Consultant';
    } elseif ( $post_id ) {
        $title = get_the_title( $post_id );
    }

    // Rename the notification in the GF UI and this stops matching.
    $is_admin_notification = strcasecmp( trim( (string) rgar( $notification, 'name' ) ), 'Admin Notification' ) === 0;

    if ( $is_admin_notification ) {
        foreach ( $form['fields'] as $field ) {
            if ( $field->type !== 'select' || ! cls_field_has_class( $field, 'preferred-consultant' ) ) {
                continue;
            }

            $value = rgar( $entry, (string) $field->id );

            if ( $value === '' || $value === 'no preference' ) {
                continue;
            }

            $parts     = explode( ',', $value );
            $member_id = (int) trim( end( $parts ) );

            if ( ! $member_id ) {
                continue;
            }

            $email = get_post_meta( $member_id, '_gs_email', true );

            if ( $email && is_email( $email ) ) {
                $notification['to'] .= ', ' . $email;
            }
        }
    }

    $notification['message'] .= '<br /> Form Embedded On: ' . $title;

    return $notification;
}
add_filter( 'gform_notification', 'cls_notify_consultant', 10, 3 );


/*
 *  ┌──────────────────────────┐
 *  │   MISC                   │
 *  └──────────────────────────┘
 */

add_filter( 'gform_confirmation_anchor', '__return_true' );