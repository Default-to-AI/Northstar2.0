"use strict";
(window.webpackChunkStripeJSinner = window.webpackChunkStripeJSinner || []).push([
    [7774], {
        75079: function(e, i, a) {
            a.r(i), a.d(i, {
                joinParams: function() {
                    return k
                },
                outgoingSchema: function() {
                    return h
                }
            });
            var n = a(84217),
                t = (0, n.Yj)(),
                _ = (0, n.ai)(),
                l = (0, n.zM)(),
                s = (0, n.Gq)(),
                r = (0, n.lq)((0, n.Yj)()),
                o = (0, n.lq)((0, n.ai)()),
                d = (0, n.lq)((0, n.zM)()),
                m = {
                    type: r,
                    code: r,
                    decline_code: r,
                    doc_url: r,
                    extra_fields: (0, n.lq)(s),
                    message: r,
                    param: r,
                    payment_intent: (0, n.lq)(s),
                    payment_method: (0, n.lq)(s),
                    setup_intent: (0, n.lq)(s),
                    status: o,
                    shouldRetry: d
                },
                p = {
                    "link.hashed_email_lookup.not_found": {
                        loggedParams: {
                            email_source: r
                        }
                    },
                    "link.consumer_session.create.success": {
                        validation: n.DG,
                        loggedParams: {
                            default_integration: r,
                            elements_assignment_id: r,
                            elements_session_id: r,
                            email_source: r,
                            has_saved_payment_methods: d,
                            in_link_auth_partnerships: d,
                            request_id: r,
                            used_hashed_email_address: d
                        }
                    },
                    "link.consumer_session.create.error": {
                        validation: n.DG,
                        loggedParams: {
                            default_integration: r,
                            email_source: r,
                            error: s,
                            in_link_auth_partnerships: d,
                            link_auth_intent_status: r,
                            request_id: r,
                            used_hashed_email_address: d
                        }
                    },
                    "link.consumer_session.start_verification.success": {
                        validation: n.DG,
                        loggedParams: {
                            default_integration: r,
                            document_hidden: d,
                            elements_assignment_id: r,
                            elements_session_id: r,
                            in_link_auth_partnerships: d,
                            in_link_in_split_card_elements_ga_cohort: r,
                            is_resend_sms_code: d,
                            link_auth_intent: d,
                            link_in_prb: r,
                            network_connection_type: r,
                            partial_cookie: d,
                            request_id: r,
                            verification_type: r
                        }
                    },
                    "link.consumer_session.start_verification.error": {
                        validation: n.DG,
                        loggedParams: {
                            default_integration: r,
                            error: s,
                            in_link_auth_partnerships: d,
                            is_resend_sms_code: d,
                            link_auth_intent: d,
                            request_id: r,
                            verification_type: r
                        }
                    },
                    "link.consumer_session.confirm_verification.success": {
                        validation: n.DG,
                        loggedParams: {
                            default_integration: r,
                            elements_assignment_id: r,
                            elements_session_id: r,
                            in_link_auth_partnerships: d,
                            in_link_in_split_card_elements_ga_cohort: r,
                            link_auth_intent: d,
                            link_in_prb: r,
                            partial_cookie: d,
                            request_id: r,
                            verification_type: r
                        }
                    },
                    "link.consumer_session.confirm_verification.error": {
                        validation: n.DG,
                        loggedParams: {
                            error: (0, n.lq)(s),
                            request_id: r,
                            default_integration: r,
                            partial_cookie: d,
                            link_auth_intent: d,
                            verification_type: r,
                            is_distinctly_link_enabled: d
                        }
                    },
                    "link.consumer_session.verification.auto_restarted": {
                        validation: n.DG,
                        loggedParams: {
                            default_integration: r,
                            verification_type: r,
                            is_distinctly_link_enabled: d
                        }
                    },
                    "link.smart_default_verification.start": {
                        validation: n.DG,
                        loggedParams: {
                            in_link_auth_partnerships: d,
                            requires_phone_match: d,
                            verification_type: r
                        }
                    },
                    "link.consumer_session.log_out.success": {
                        validation: n.DG,
                        loggedParams: {}
                    },
                    "link.consumer_session.log_out.error": {
                        validation: n.DG,
                        loggedParams: {}
                    },
                    "link.consumer_account.sign_up.success": {
                        validation: n.DG,
                        loggedParams: {
                            default_integration: r,
                            in_link_auth_partnerships: d,
                            request_id: r
                        }
                    },
                    "link.consumer_account.sign_up.error": {
                        validation: n.DG,
                        loggedParams: {
                            error: s,
                            default_integration: r,
                            request_id: r,
                            payment_form: r
                        }
                    },
                    "link.payment_details.create.success": {
                        validation: n.DG,
                        loggedParams: {
                            request_id: r,
                            payment_details_id: r,
                            payment_details_type: r,
                            default_integration: r
                        }
                    },
                    "link.payment_details.create.error": {
                        validation: n.DG,
                        loggedParams: {
                            error: (0, n.lq)((0, n.Ik)(m)),
                            request_id: r,
                            default_integration: r,
                            payment_form: r
                        }
                    },
                    "link.payment_details.list.success": {
                        validation: n.DG,
                        loggedParams: {
                            request_id: r,
                            payment_details_count: o,
                            payment_method_types: (0, n.lq)(s),
                            default_integration: r,
                            has_repairable_bank_account: d
                        }
                    },
                    "link.payment_details.list.error": {
                        validation: n.DG,
                        loggedParams: {
                            default_integration: r,
                            error: s,
                            request_id: r
                        }
                    },
                    "link.payment_details.delete.success": {
                        validation: n.DG,
                        loggedParams: {
                            payment_details_id: r,
                            request_id: r
                        }
                    },
                    "link.payment_details.delete.error": {
                        validation: n.DG,
                        loggedParams: {
                            error: s,
                            payment_details_id: r,
                            request_id: r
                        }
                    },
                    "link.payment_details.update.success": {
                        validation: n.DG,
                        loggedParams: {
                            payment_details_id: r,
                            request_id: r
                        }
                    },
                    "link.payment_details.update.error": {
                        validation: n.DG,
                        loggedParams: {
                            error: s,
                            payment_details_id: r,
                            request_id: r
                        }
                    },
                    "link.shipping_address.create.success": {
                        validation: n.DG,
                        loggedParams: {
                            request_id: r,
                            shipping_address_id: r,
                            default_integration: r
                        }
                    },
                    "link.shipping_address.create.error": {
                        validation: n.DG,
                        loggedParams: {
                            error: s,
                            request_id: r,
                            default_integration: r
                        }
                    },
                    "link.shipping_address.list.success": {
                        validation: n.DG,
                        loggedParams: {
                            default_integration: r,
                            elements_assignment_id: r,
                            elements_session_id: r,
                            in_link_auth_partnerships: d,
                            in_link_in_split_card_elements_ga_cohort: r,
                            link_in_prb: r,
                            request_id: r,
                            shipping_addresses_count: o
                        }
                    },
                    "link.shipping_address.list.error": {
                        validation: n.DG,
                        loggedParams: {
                            default_integration: r,
                            error: s,
                            request_id: r
                        }
                    },
                    "link.shipping_address.delete.success": {
                        validation: n.DG,
                        loggedParams: {
                            in_link_auth_partnerships: r,
                            request_id: r,
                            shipping_address_id: r
                        }
                    },
                    "link.shipping_address.delete.error": {
                        validation: n.DG,
                        loggedParams: {
                            error: s,
                            request_id: r,
                            shipping_address_id: r
                        }
                    },
                    "link.shipping_address.update.success": {
                        validation: n.DG,
                        loggedParams: {
                            request_id: r,
                            shipping_address_id: r,
                            default_integration: r
                        }
                    },
                    "link.shipping_address.update.error": {
                        validation: n.DG,
                        loggedParams: {
                            error: s,
                            request_id: r,
                            default_integration: r
                        }
                    },
                    "link.refresh_login.start": {
                        validation: n.DG,
                        loggedParams: {}
                    },
                    "link.refresh_login.success": {
                        validation: n.DG,
                        loggedParams: {}
                    },
                    "link.refresh_login.error": {
                        validation: n.DG,
                        loggedParams: {}
                    },
                    "list_card_payment_status.success": {
                        validation: n.DG,
                        loggedParams: {
                            cardToken: t,
                            element_id: r,
                            in_link_auth_partnerships: d,
                            requestId: t,
                            status: (0, n.Ik)({
                                authorized: d,
                                charge: r,
                                error: (0, n.Ik)({
                                    code: r,
                                    decline_code: r,
                                    message: r,
                                    param: r
                                })
                            })
                        }
                    },
                    "list_card_payment_status.server_error": {
                        validation: n.DG,
                        loggedParams: {
                            cardToken: t,
                            element_id: r,
                            error: (0, n.Ik)({
                                code: r,
                                doc_url: r,
                                extra_fields: (0, n.Ik)({
                                    name: t
                                }),
                                message: r,
                                param: r,
                                status: o,
                                type: t
                            }),
                            in_link_auth_partnerships: r,
                            requestId: r
                        }
                    },
                    "list_card_payment_status.unknown_error": {
                        validation: n.DG,
                        loggedParams: {
                            element_id: r,
                            err: (0, n.Ik)({
                                name: t
                            })
                        }
                    },
                    "list_card_payment_status.network_error": {
                        validation: n.DG,
                        loggedParams: {}
                    },
                    "list_card_payment_status.fetch_error": {
                        validation: n.DG,
                        loggedParams: {}
                    },
                    "link.clear_lookup_cache": {
                        validation: n.DG,
                        loggedParams: {
                            previous_enabled_merchant_payment_methods: (0, n.YO)(t),
                            enabled_merchant_payment_methods: (0, n.YO)(t)
                        }
                    },
                    "link.autofill_modal.decommission": {
                        validation: n.DG,
                        loggedParams: {}
                    },
                    "link.autofill_modal.decommissioned.show": {
                        validation: n.DG,
                        loggedParams: {}
                    },
                    "link.autofill_modal.decommissioned.launch": {
                        validation: n.DG,
                        loggedParams: {
                            in_link_auth_partnerships: d
                        }
                    },
                    "link.autofill_modal.decommissioned.logout": {
                        validation: n.DG,
                        loggedParams: {}
                    },
                    "link.autofill_modal.decommissioned.on": {
                        validation: n.DG,
                        loggedParams: {
                            in_link_auth_partnerships: d
                        }
                    },
                    "link.email_otp.send_code_to_email_clicked": {
                        validation: n.DG,
                        loggedParams: {
                            element_id: t,
                            email_otp_requires_additional_info: l,
                            email_otp_verify_phone_despite_sms_otp: l,
                            in_link_auth_partnerships: d
                        }
                    },
                    "link.email_otp.resend_code": {
                        validation: n.DG,
                        loggedParams: {
                            element_id: t,
                            email_otp_requires_additional_info: l,
                            email_otp_verify_phone_despite_sms_otp: l,
                            in_link_auth_partnerships: d
                        }
                    },
                    "link.email_otp.phone_verification.opened": {
                        validation: n.DG,
                        loggedParams: {
                            element_id: t,
                            in_link_auth_partnerships: d
                        }
                    },
                    "link.email_otp.phone_verification.back_clicked": {
                        validation: n.DG,
                        loggedParams: {
                            element_id: t,
                            in_link_auth_partnerships: d
                        }
                    },
                    "link.email_otp.phone_verification.success": {
                        validation: n.DG,
                        loggedParams: {
                            element_id: r,
                            in_link_auth_partnerships: d
                        }
                    },
                    "link.sms_otp.send_code_to_sms_clicked": {
                        validation: n.DG,
                        loggedParams: {}
                    },
                    "link.sms_otp.resend_code_clicked": {
                        validation: n.DG,
                        loggedParams: {}
                    },
                    "link.auth_partnerships.mount_started": {
                        validation: n.DG,
                        loggedParams: {
                            in_link_auth_partnerships: d,
                            partner_experiment_variant: t,
                            partner_session_id: t
                        }
                    },
                    "link.auth_partnerships.pending_mount_in_flight": {
                        validation: n.DG,
                        loggedParams: {
                            in_link_auth_partnerships: d
                        }
                    },
                    "link.auth_partnerships.mount_conflict": {
                        validation: n.DG,
                        loggedParams: {
                            in_link_auth_partnerships: l,
                            reason: t
                        }
                    },
                    "link.auth_partnerships.render_delay_timeout": {
                        validation: n.DG,
                        loggedParams: {
                            element_id: t,
                            in_link_auth_partnerships: l
                        }
                    },
                    "link.auth_partnerships.default_email_delay_timeout": {
                        validation: n.DG,
                        loggedParams: {
                            element_id: r,
                            in_link_auth_partnerships: l
                        }
                    },
                    "link.auth_partnerships.info_retrieved_late": {
                        validation: n.DG,
                        loggedParams: {
                            element_id: r,
                            hasLinkAuthIntent: l,
                            hasLinkAuthToken: l,
                            in_link_auth_partnerships: l
                        }
                    },
                    "link.auth_partnerships.info_retrieved": {
                        validation: n.DG,
                        loggedParams: {
                            element_id: t,
                            hasIntent: l,
                            hasToken: l,
                            in_link_auth_partnerships: l,
                            is_initial_retrieve: l,
                            since_create: _,
                            since_mount: _,
                            since_retrieve_started: _,
                            since_sjs_load: _,
                            since_stripe_create: _
                        }
                    },
                    "link.auth_partnerships.info_retrieve_failed": {
                        validation: n.DG,
                        loggedParams: {
                            element_id: r,
                            hasLinkAuthIntent: l,
                            hasLinkAuthToken: l,
                            in_link_auth_partnerships: l,
                            is_initial: t,
                            reason: t
                        }
                    },
                    "link.auth_partnerships.info_retrieve.not_found_on_initial": {
                        validation: n.DG,
                        loggedParams: {
                            element_id: t,
                            in_link_auth_partnerships: d
                        }
                    },
                    "link.auth_partnerships.info_retrieve.ineligible": {
                        validation: n.DG,
                        loggedParams: {
                            element_id: r,
                            in_link_auth_partnerships: l,
                            is_initial: t
                        }
                    },
                    "link.auth_partnerships.login_with_link_auth_intent": {
                        validation: n.DG,
                        loggedParams: {
                            element_id: r,
                            in_link_auth_partnerships: l
                        }
                    },
                    "link.auth_partnerships.login_with_link_auth_intent.skipped": {
                        validation: n.DG,
                        loggedParams: {
                            can_trigger_link_auth_login: l,
                            element_id: r,
                            has_consumer_session_for_link_auth_intent: l,
                            in_link_auth_partnerships: l,
                            is_eligible_for_link_auth: l,
                            is_otp_target_visible: l,
                            is_payment_element_initialized: l,
                            is_touched: l,
                            link_auth_initialized: l,
                            start_verification_request_status: t
                        }
                    },
                    "link.auth_partnerships.login_with_link_auth_token": {
                        validation: n.DG,
                        loggedParams: {
                            element_id: r,
                            in_link_auth_partnerships: l
                        }
                    },
                    "link.auth_partnerships.frame_id_missing": {
                        validation: n.DG,
                        loggedParams: {
                            action: t
                        }
                    },
                    "link.auth_partnerships.frame_init_failed": {
                        validation: n.DG,
                        loggedParams: {}
                    },
                    "link.auth_partnerships.frame_init_exception": {
                        validation: n.DG,
                        loggedParams: {}
                    },
                    "link.auth_partnerships.frame.error": {
                        validation: n.DG,
                        loggedParams: {
                            error_message: t,
                            error_type: t,
                            handshake_attempts: o,
                            in_link_auth_partnerships: l
                        }
                    },
                    "link.auth_partnerships.frame.mounted": {
                        validation: n.DG,
                        loggedParams: {
                            in_link_auth_partnerships: l
                        }
                    },
                    "link.auth_partnerships.frame.loaded": {
                        validation: n.DG,
                        loggedParams: {
                            in_link_auth_partnerships: l
                        }
                    },
                    "link.auth_partnerships.frame.max_handshake_attempts": {
                        validation: n.DG,
                        loggedParams: {
                            attempts: _,
                            in_link_auth_partnerships: l
                        }
                    },
                    "link.auth_partnerships.frame.handshake_sent": {
                        validation: n.DG,
                        loggedParams: {
                            in_link_auth_partnerships: l,
                            partner: r
                        }
                    },
                    "link.auth_partnerships.frame.handshake_started": {
                        validation: n.DG,
                        loggedParams: {
                            in_link_auth_partnerships: l
                        }
                    },
                    "link.auth_partnerships.frame.partner_status_received": {
                        validation: n.DG,
                        loggedParams: {
                            handshake_attempts: _,
                            has_link_auth_intent: l,
                            has_link_auth_token: l,
                            in_link_auth_partnerships: l,
                            metadata: (0, n.Ik)({
                                iab_session_id: t,
                                test_arm: t
                            }),
                            partner: t
                        }
                    },
                    "link.auth_partnerships.frame.partner_status_received.empty": {
                        validation: n.DG,
                        loggedParams: {
                            handshake_attempts: _,
                            has_link_auth_intent: l,
                            has_link_auth_token: l,
                            in_link_auth_partnerships: l,
                            metadata: (0, n.Ik)({
                                iab_session_id: t,
                                test_arm: t
                            }),
                            partner: t
                        }
                    },
                    "link.auth_partnerships.frame.init_started": {
                        validation: n.DG,
                        loggedParams: {
                            in_link_auth_partnerships: l
                        }
                    },
                    "link.auth_partnerships.frame.consumer_connected_event_sent": {
                        validation: n.DG,
                        loggedParams: {
                            in_link_auth_partnerships: l,
                            partner: t
                        }
                    },
                    "link.auth_partnerships.frame.consumer_disconnected_event_sent": {
                        validation: n.DG,
                        loggedParams: {
                            in_link_auth_partnerships: l,
                            partner: t
                        }
                    },
                    "link.auth_partnerships.frame.payment_signal_event_sent": {
                        validation: n.DG,
                        loggedParams: {}
                    },
                    "link.auth_partnerships.frame.new_controller": {
                        validation: n.DG,
                        loggedParams: {
                            controller_count: _,
                            in_link_auth_partnerships: l
                        }
                    },
                    "link.auth_partnerships.frame_v2.handshake_started": {
                        validation: n.DG,
                        loggedParams: {
                            in_link_auth_partnerships: l
                        }
                    },
                    "link.auth_partnerships.frame_v2.handshake_sent": {
                        validation: n.DG,
                        loggedParams: {
                            in_link_auth_partnerships: t
                        }
                    },
                    "link.auth_partnerships.frame_v2.handshake_success": {
                        validation: n.DG,
                        loggedParams: {
                            duration_ms: t,
                            has_link_auth_intent: t,
                            has_link_auth_token: t,
                            in_link_auth_partnerships: t,
                            partner_session_id: t
                        }
                    },
                    "link.auth_partnerships.frame_v2.handshake_error": {
                        validation: n.DG,
                        loggedParams: {
                            duration_ms: _,
                            error: t,
                            in_link_auth_partnerships: l
                        }
                    },
                    "link.auth_partnerships.frame_v2.message_handler_missing": {
                        validation: n.DG,
                        loggedParams: {}
                    },
                    "link.auth_partnerships.frame_v2.consumer_connected_event_sent": {
                        validation: n.DG,
                        loggedParams: {}
                    },
                    "link.auth_partnerships.frame_v2.consumer_disconnected_event_sent": {
                        validation: n.DG,
                        loggedParams: {}
                    },
                    "link.auth_partnerships.frame_v2.payment_signal_event_sent": {
                        validation: n.DG,
                        loggedParams: {}
                    },
                    "link.auth_partnerships.partner_experiment_data": {
                        validation: n.DG,
                        loggedParams: {
                            iab_session_id: t,
                            in_link_auth_partnerships: l,
                            test_arm: t
                        }
                    },
                    "link.auth_partnerships.partner_debug_data": {
                        validation: n.DG,
                        loggedParams: {}
                    },
                    "link.auth_partnerships.partner_debug_data_log_error": {
                        validation: n.DG,
                        loggedParams: {}
                    },
                    "link.auth_partnerships.partner_bridge_missing": {
                        validation: n.DG,
                        loggedParams: {}
                    },
                    "link.auth_partnerships.unfiltered_partner_experiment_data": {
                        validation: n.DG,
                        loggedParams: {
                            iab_session_id: r,
                            in_link_auth_partnerships: d,
                            test_arm: r
                        }
                    },
                    "link.auth_partnerships.partner_data_validation_error": {
                        validation: n.DG,
                        loggedParams: {}
                    },
                    "link.auth_partnerships.auth_element_wrapper.timeout": {
                        validation: n.DG,
                        loggedParams: {
                            element_id: r,
                            in_link_auth_partnerships: l
                        }
                    },
                    "lae.hashed_email.triggered_login": {
                        loggedParams: {}
                    },
                    "link.auth_partnerships.disabled_for_holdback": {
                        validation: n.DG,
                        loggedParams: {}
                    },
                    "link.auth_partnerships.session_eligible": {
                        validation: n.DG,
                        loggedParams: {
                            in_link_auth_partnerships: d
                        }
                    },
                    "link.auth_partnerships.partner_eligible_flag_set_error": {
                        validation: n.DG,
                        loggedParams: {}
                    },
                    "link.auth_partnerships.ece.login_with_lai": {
                        validation: n.DG,
                        loggedParams: {}
                    },
                    "link.auth_partnerships.ece.login_with_lat": {
                        validation: n.DG,
                        loggedParams: {}
                    },
                    "link.auth_partnerships.ece.lat_fetch_error": {
                        validation: n.DG,
                        loggedParams: {}
                    },
                    "link.auth_partnerships.ece.disabled_reasons": {
                        validation: n.DG,
                        loggedParams: {}
                    },
                    "link.auth_partnerships.ece.hidden_for_partner_holdback": {
                        validation: n.DG,
                        loggedParams: {}
                    },
                    "link.consumer_session_wrapper.timeout": {
                        validation: n.DG,
                        loggedParams: {
                            element_id: t
                        }
                    },
                    "link.cookie.ignored": {
                        validation: n.DG,
                        loggedParams: {}
                    },
                    "link.otp.closed": {
                        validation: n.DG,
                        loggedParams: {
                            element_id: r,
                            in_link_auth_partnerships: d,
                            is_recollecting_phone: l
                        }
                    },
                    "link.otp.opened": {
                        validation: n.DG,
                        loggedParams: {
                            element_id: r,
                            in_link_auth_partnerships: r
                        }
                    },
                    "link.otp.focused": {
                        validation: n.DG,
                        loggedParams: {
                            element_id: t,
                            in_link_auth_partnerships: d
                        }
                    },
                    "link.otp.type.start": {
                        validation: n.DG,
                        loggedParams: {
                            element_id: r,
                            elements_assignment_id: r,
                            elements_session_id: r,
                            in_link_auth_partnerships: d
                        }
                    },
                    "link.autofill_prompt.otp.rendered": {
                        validation: n.DG,
                        loggedParams: {
                            element_id: r,
                            in_link_auth_partnerships: d,
                            show_meta_consent_disclaimer: l
                        }
                    },
                    "link.logged_in": {
                        validation: n.DG,
                        loggedParams: {
                            default_integration: r,
                            recollect_cvc: d,
                            recollect_billing: d,
                            recollect_expiry: d,
                            recollect_name: d,
                            num_saved_payment_details: o,
                            num_saved_shipping_addresses: o,
                            has_customer_email: d,
                            has_lae_default_values_email: d,
                            has_lape_default_values_email: d,
                            payment_details_id: r
                        }
                    },
                    "link.start_login_with_auth_session_client_secret": {
                        validation: n.DG,
                        loggedParams: {
                            partial_cookie: d,
                            default_integration: r
                        }
                    },
                    "link.logged_in_with_auth_session_client_secret": {
                        validation: n.DG,
                        loggedParams: {
                            default_integration: r,
                            recollect_cvc: d,
                            recollect_billing: d,
                            recollect_expiry: d,
                            recollect_name: d,
                            num_saved_payment_details: o,
                            num_saved_shipping_addresses: o,
                            has_customer_email: d,
                            has_lae_default_values_email: d,
                            has_lape_default_values_email: d,
                            payment_details_id: r
                        }
                    },
                    "link.logged_in_with_link_store_state": {
                        validation: n.DG,
                        loggedParams: {
                            default_integration: r,
                            recollect_cvc: d,
                            recollect_billing: d,
                            recollect_expiry: d,
                            recollect_name: d,
                            num_saved_payment_details: o,
                            num_saved_shipping_addresses: o,
                            has_customer_email: d,
                            has_lae_default_values_email: d,
                            has_lape_default_values_email: d,
                            payment_details_id: r
                        }
                    },
                    "link.not_logged_in_with_auth_session_client_secret": {
                        validation: n.DG,
                        loggedParams: {}
                    },
                    "link.auth_session_client_secret_login_timed_out_with_valid_credentials": {
                        validation: n.DG,
                        loggedParams: {
                            element: r,
                            timeout: o,
                            timeout_elapsed_time: o
                        }
                    },
                    "link.logged_in_with_link_auth_token_client_secret": {
                        validation: n.DG,
                        loggedParams: {
                            default_integration: r,
                            recollect_cvc: d,
                            recollect_billing: d,
                            recollect_expiry: d,
                            recollect_name: d,
                            num_saved_payment_details: o,
                            num_saved_shipping_addresses: o,
                            has_customer_email: d,
                            has_lae_default_values_email: d,
                            has_lape_default_values_email: d,
                            payment_details_id: r
                        }
                    },
                    "link.logged_in_with_consumer_info": {
                        validation: n.DG,
                        loggedParams: {
                            default_integration: r,
                            recollect_cvc: d,
                            recollect_billing: d,
                            recollect_expiry: d,
                            recollect_name: d,
                            num_saved_payment_details: o,
                            num_saved_shipping_addresses: o,
                            has_customer_email: d,
                            has_lae_default_values_email: d,
                            has_lape_default_values_email: d,
                            payment_details_id: r
                        }
                    },
                    "link.email.entered": {
                        validation: n.DG,
                        loggedParams: {
                            debounced_email_matches_consumer_session_email: t,
                            found_using_partial_cookie: t,
                            has_consumer_session: t,
                            is_consumer_loaded: t,
                            link_view: t,
                            link_view_auth_status: t
                        }
                    },
                    "link.cookie_email_mismatch": {
                        validation: n.DG,
                        loggedParams: {}
                    },
                    "link.name_field_shown": {
                        validation: n.DG,
                        loggedParams: {
                            element_id: t,
                            in_link_auth_partnerships: d,
                            mounted_link_authentication: l
                        }
                    },
                    "link.opt_in.shown": {
                        validation: n.DG,
                        loggedParams: {
                            element_id: r,
                            elements_assignment_id: r,
                            elements_session_id: r,
                            in_link_auth_partnerships: d,
                            in_link_in_split_card_elements_ga_cohort: r,
                            link_default_opt_in_behavior: t,
                            link_in_prb: r,
                            mounted_link_authentication: l
                        }
                    },
                    "link.opt_in.hidden": {
                        validation: n.DG,
                        loggedParams: {
                            element_id: r,
                            in_link_auth_partnerships: d,
                            link_default_opt_in_behavior: t,
                            mounted_link_authentication: l
                        }
                    },
                    "link.opt_in.checked": {
                        validation: n.DG,
                        loggedParams: {
                            element_id: r,
                            in_link_auth_partnerships: d,
                            mounted_link_authentication: l
                        }
                    },
                    "link.opt_in.unchecked": {
                        validation: n.DG,
                        loggedParams: {
                            element_id: t,
                            in_link_auth_partnerships: d,
                            mounted_link_authentication: l
                        }
                    },
                    "link.opt_in.optional_doi_unchecked": {
                        validation: n.DG,
                        loggedParams: {
                            element_id: t,
                            in_link_auth_partnerships: d
                        }
                    },
                    "link.opt_in.more_info": {
                        validation: n.DG,
                        loggedParams: {
                            element_id: r,
                            in_link_auth_partnerships: d
                        }
                    },
                    "link.invalid_sign_up": {
                        validation: n.DG,
                        loggedParams: {
                            optInFlow: r,
                            missingEmail: d,
                            missingPhone: d,
                            linkOptInConsentShown: d,
                            isLinkOptInTouched: d,
                            linkOptInBehavior: r
                        }
                    },
                    "link.sign_up_success": {
                        validation: n.DG,
                        loggedParams: {
                            missingEmail: d,
                            missingPhone: d,
                            linkOptInConsentShown: d,
                            isLinkOptInTouched: d,
                            linkOptInBehavior: r
                        }
                    },
                    "link.backup_pm.viewed": {
                        validation: n.DG,
                        loggedParams: {
                            element_id: t,
                            in_link_auth_partnerships: d,
                            selected_payment_detail_type: t
                        }
                    },
                    "link.backup_pm.more_info": {
                        validation: n.DG,
                        loggedParams: {
                            element_id: t,
                            in_link_auth_partnerships: d,
                            selected_payment_detail_type: t
                        }
                    },
                    "link.backup_pm.menu": {
                        validation: n.DG,
                        loggedParams: {}
                    },
                    "link.backup_pm.disabled": {
                        validation: n.DG,
                        loggedParams: {
                            element_id: t,
                            in_link_auth_partnerships: d,
                            selected_payment_detail_type: t
                        }
                    },
                    "link.backup_pm.enabled": {
                        validation: n.DG,
                        loggedParams: {
                            element_id: t,
                            in_link_auth_partnerships: d,
                            selected_payment_detail_type: t
                        }
                    },
                    "link.backup_pm.no_backup_id": {
                        validation: n.DG,
                        loggedParams: {}
                    },
                    "link.sign_up.disabled_on_pageload": {
                        validation: n.DG,
                        loggedParams: {
                            element_id: t
                        }
                    },
                    "link.sign_up.disabled_by_billing_country": {
                        validation: n.DG,
                        loggedParams: {
                            element_id: r
                        }
                    },
                    "link.sign_up.enabled_by_billing_country": {
                        validation: n.DG,
                        loggedParams: {
                            element_id: r,
                            elements_assignment_id: r,
                            elements_session_id: r,
                            in_link_auth_partnerships: d,
                            in_link_in_split_card_elements_ga_cohort: r,
                            link_in_prb: d
                        }
                    },
                    "link.financial_incentive.shown": {
                        validation: n.DG,
                        loggedParams: {}
                    },
                    "link.financial_incentive.hidden": {
                        validation: n.DG,
                        loggedParams: {}
                    },
                    "link.financial_incentive.confirmation.error": {
                        validation: n.DG,
                        loggedParams: {
                            paymentDetailsId: r,
                            res: (0, n.lq)(s)
                        }
                    },
                    "link.financial_incentive.amount_mismatch": {
                        validation: n.DG,
                        loggedParams: {}
                    },
                    "link.incentive_promo.shown": {
                        validation: n.DG,
                        loggedParams: {
                            financial_incentive: t,
                            render_context: t
                        }
                    },
                    "link.incentive_promo.hidden": {
                        validation: n.DG,
                        loggedParams: {
                            financial_incentive: t,
                            render_context: t
                        }
                    },
                    "link.instant_debits.bank_tab.shown": {
                        validation: n.DG,
                        loggedParams: {
                            element_id: t,
                            elements_assignment_id: r,
                            elements_session_id: r,
                            in_link_auth_partnerships: d,
                            link_in_prb: r,
                            link_mode: t,
                            link_with_incentives: l
                        }
                    },
                    "link.instant_debits.bank_tab.selected": {
                        validation: n.DG,
                        loggedParams: {
                            element_id: t,
                            in_link_auth_partnerships: d
                        }
                    },
                    "link.instant_debits.bank_tab.unselected": {
                        validation: n.DG,
                        loggedParams: {
                            element_id: r,
                            in_link_auth_partnerships: d
                        }
                    },
                    "link.instant_debits.incentive_promo.shown": {
                        validation: n.DG,
                        loggedParams: {
                            element_id: t,
                            elements_assignment_id: r,
                            elements_session_id: r,
                            financial_incentive: _,
                            in_link_auth_partnerships: d,
                            payment_method_type: t,
                            render_context: t
                        }
                    },
                    "link.instant_debits.incentive_promo.hidden": {
                        validation: n.DG,
                        loggedParams: {
                            element_id: t,
                            financial_incentive: _,
                            in_link_auth_partnerships: d,
                            payment_method_type: t,
                            render_context: t
                        }
                    },
                    "link.instant_debits.hidden_on_client": {
                        validation: n.DG,
                        loggedParams: {
                            element_id: t
                        }
                    },
                    "link.instant_debits.protection_promo.shown": {
                        validation: n.DG,
                        loggedParams: {}
                    },
                    "link.purchase_protection.modal.open": {
                        validation: n.DG,
                        loggedParams: {
                            element_id: t
                        }
                    },
                    "link.purchase_protection.opt_in.rendered": {
                        validation: n.DG,
                        loggedParams: {
                            element_id: r,
                            in_link_auth_partnerships: r
                        }
                    },
                    "link.purchase_protection.autofill_prompt.rendered": {
                        validation: n.DG,
                        loggedParams: {
                            element_id: t,
                            in_link_auth_partnerships: r
                        }
                    },
                    "link.purchase_protection.banner.rendered": {
                        validation: n.DG,
                        loggedParams: {
                            element_id: t,
                            in_link_auth_partnerships: d
                        }
                    },
                    "link.purchase_protection.banner.expanded": {
                        validation: n.DG,
                        loggedParams: {
                            element_id: t,
                            in_link_auth_partnerships: r
                        }
                    },
                    "link.purchase_protection.add_new_pm.rendered": {
                        validation: n.DG,
                        loggedParams: {
                            element_id: t,
                            in_link_auth_partnerships: d
                        }
                    },
                    "link.instant_debits.purchase_protection.banner.shown": {
                        validation: n.DG,
                        loggedParams: {}
                    },
                    "link.instant_debits.purchase_protection.banner.clicked": {
                        validation: n.DG,
                        loggedParams: {}
                    },
                    "link.instant_debits.purchase_protection.banner.readonly.clicked": {
                        validation: n.DG,
                        loggedParams: {}
                    },
                    "link.default_integration": {
                        validation: n.DG,
                        loggedParams: {
                            element_id: t,
                            elements_assignment_id: r,
                            elements_session_id: r,
                            in_link_auth_partnerships: d,
                            in_link_in_split_card_elements_ga_cohort: r,
                            link_in_prb: r
                        }
                    },
                    "link.default_integration.timeout": {
                        validation: n.DG,
                        loggedParams: {
                            element_id: r,
                            hasSessionForDefaultEmail: l,
                            in_link_auth_partnerships: d,
                            in_link_in_split_card_elements_ga_cohort: r,
                            link_in_prb: r,
                            shouldBlockRenderUntilExperimentExposure: r,
                            shouldBlockRenderUntilLinkModalLoad: r
                        }
                    },
                    "link.default_integration.email_entered": {
                        validation: n.DG,
                        loggedParams: {
                            element_id: t,
                            in_link_auth_partnerships: d,
                            source: t
                        }
                    },
                    "link.default_integration.email_change": {
                        validation: n.DG,
                        loggedParams: {
                            element_id: r,
                            in_link_auth_partnerships: d
                        }
                    },
                    "link.default_integration.autofill_open": {
                        validation: n.DG,
                        loggedParams: {
                            element_id: r,
                            in_link_auth_partnerships: d
                        }
                    },
                    "link.default_integration.autofill_close": {
                        validation: n.DG,
                        loggedParams: {
                            element_id: t,
                            in_link_auth_partnerships: d
                        }
                    },
                    "link.default_integration.email_enter_start": {
                        validation: n.DG,
                        loggedParams: {
                            element_id: r,
                            elements_assignment_id: r,
                            elements_session_id: r,
                            in_link_auth_partnerships: d,
                            source: t
                        }
                    },
                    "link.default_integration.phone_number_enter_start": {
                        validation: n.DG,
                        loggedParams: {
                            element_id: r,
                            in_link_auth_partnerships: d,
                            source: t
                        }
                    },
                    "link.default_integration.card_form_change": {
                        validation: n.DG,
                        loggedParams: {
                            element_id: t,
                            elements_assignment_id: r,
                            elements_session_id: r,
                            in_link_auth_partnerships: d,
                            in_link_in_split_card_elements_ga_cohort: r,
                            link_in_prb: d
                        }
                    },
                    "link.default_integration.treatment_autofill_message": {
                        validation: n.DG,
                        loggedParams: {}
                    },
                    "link.default_integration.secure_opt_in_message": {
                        validation: n.DG,
                        loggedParams: {}
                    },
                    "link.payment_element.integration_type": {
                        validation: n.DG,
                        loggedParams: {
                            element_id: r,
                            elements_assignment_id: r,
                            elements_session_id: r,
                            in_link_auth_partnerships: d,
                            in_link_in_split_card_elements_ga_cohort: r,
                            link_in_prb: r,
                            request_surface: t
                        }
                    },
                    "link.passthrough_mode": {
                        validation: n.DG,
                        loggedParams: {}
                    },
                    "link.payment_details.share.success": {
                        validation: n.DG,
                        loggedParams: {
                            merchantId: r,
                            paymentDetailsId: r,
                            selected_payment_method_type: r
                        }
                    },
                    "link.payment_details.share.error": {
                        validation: n.DG,
                        loggedParams: {
                            error: s,
                            selected_payment_method_type: t
                        }
                    },
                    "link.consumer_lookup_response_id": {
                        validation: n.DG,
                        loggedParams: {
                            elements_assignment_id: r,
                            elements_session_id: r,
                            in_link_auth_partnerships: d,
                            lae_dl_otp: r,
                            link_backup_pm_default_on: r,
                            link_condensed_ece_personalization: r,
                            link_ece_default_values_personalization: r,
                            link_ece_default_values_personalization_v2: r,
                            wanderlust_benchmarking: r
                        }
                    },
                    "link.customer_and_cookie_email_dont_match": {
                        validation: n.DG,
                        loggedParams: {
                            default_integration: r,
                            partial_cookie: d
                        }
                    },
                    "link.paying_with_link_selector_conflicts_with_payment_method_data": {
                        validation: n.DG,
                        loggedParams: {
                            element_id: r,
                            has_spm_and_not_link_authenticated: l,
                            is_in_lae_autofill_opt_out: l,
                            is_logged_in: l,
                            is_paying_with_link_payment_method_selector: l,
                            is_showing_logged_in_ui: l,
                            selected_payment_method: t
                        }
                    },
                    "link.get_http_cookie_race_outcome": {
                        validation: n.DG,
                        loggedParams: {
                            raceWon: t
                        }
                    },
                    "link.set_http_cookie": {
                        validation: n.DG,
                        loggedParams: {}
                    },
                    "link.set_http_cookie.success": {
                        validation: n.DG,
                        loggedParams: {}
                    },
                    "link.set_http_cookie.error": {
                        validation: n.DG,
                        loggedParams: {}
                    },
                    "link.remove_http_cookie": {
                        validation: n.DG,
                        loggedParams: {}
                    },
                    "link.remove_http_cookie.success": {
                        validation: n.DG,
                        loggedParams: {}
                    },
                    "link.remove_http_cookie.error": {
                        validation: n.DG,
                        loggedParams: {}
                    },
                    "link.mismatch_billing_details": {
                        validation: n.DG,
                        loggedParams: {
                            has_merchant_city: l,
                            has_merchant_country: l,
                            has_merchant_line1: l,
                            has_merchant_line2: l,
                            has_merchant_postal_code: l,
                            has_merchant_state: l,
                            in_link_auth_partnerships: d,
                            mismatch_country: l,
                            mismatch_postal_code: l
                        }
                    },
                    "link.disabled_reasons": {
                        validation: n.DG,
                        loggedParams: {
                            element_id: r,
                            elements_assignment_id: r,
                            elements_session_id: r,
                            in_link_auth_partnerships: d,
                            in_link_in_split_card_elements_ga_cohort: r,
                            link_in_prb: d,
                            reasons: t
                        }
                    },
                    "link.hidden_reasons": {
                        validation: n.DG,
                        loggedParams: {
                            buttonType: t,
                            element_id: t,
                            focusedCardElementField: r,
                            in_link_auth_partnerships: d,
                            insufficientHeight: l,
                            insufficientWidth: l,
                            measurements: (0, n.Ik)({
                                availableWidth: _,
                                buttonWidth: _,
                                height: _,
                                inputWidth: o,
                                outerHeight: o
                            }),
                            reason: t
                        }
                    },
                    "link.enabled": {
                        validation: n.DG,
                        loggedParams: {
                            element_id: t,
                            elements_assignment_id: r,
                            elements_session_id: r,
                            in_link_auth_partnerships: d,
                            mode: t
                        }
                    },
                    "link.consumer_session_login.link_availability_changed": {
                        validation: n.DG,
                        loggedParams: {}
                    },
                    "link.webauthn.login_button.clicked": {
                        validation: n.DG,
                        loggedParams: {
                            element_id: r,
                            in_link_auth_partnerships: r,
                            verification_session_id: t
                        }
                    },
                    "link.webauthn.login_button.rendered": {
                        validation: n.DG,
                        loggedParams: {
                            element_id: t,
                            in_link_auth_partnerships: r
                        }
                    },
                    "link.global_holdback.lookup_error": {
                        validation: n.DG,
                        loggedParams: {}
                    },
                    "link.global_holdback.lookup_success": {
                        validation: n.DG,
                        loggedParams: {
                            elements_assignment_id: r,
                            elements_session_id: r,
                            in_link_auth_partnerships: d,
                            recognition_type: r,
                            request_id: t
                        }
                    },
                    "link.global_holdback.lookup_failure": {
                        validation: n.DG,
                        loggedParams: {
                            elements_assignment_id: r,
                            elements_session_id: r,
                            error: (0, n.Ik)({
                                code: r,
                                doc_url: r,
                                extra_fields: (0, n.Ik)({
                                    name: r
                                }),
                                message: r,
                                param: r,
                                shouldRetry: d,
                                status: o,
                                type: r
                            }),
                            in_link_auth_partnerships: d,
                            request_id: r
                        }
                    },
                    "link.instant_debits_holdback.lookup_error": {
                        validation: n.DG,
                        loggedParams: {
                            error: s,
                            request_id: r
                        }
                    },
                    "link.instant_debits_holdback.lookup_success": {
                        validation: n.DG,
                        loggedParams: {
                            consumer_account_id: r,
                            request_id: r,
                            recognition_type: r
                        }
                    },
                    "link.instant_debits_holdback.lookup_failure": {
                        validation: n.DG,
                        loggedParams: {}
                    },
                    "link.global_holdback.exposure_update": {
                        validation: n.DG,
                        loggedParams: {
                            arb_id: t,
                            dvs_provided: t,
                            eligible_for_link: r,
                            has_spms: r,
                            in_link_auth_partnerships: d,
                            integration_type: r,
                            intent_type: t,
                            is_link_holdback_manager: l,
                            is_returning_link_user: l,
                            link_default_opt_in: r,
                            recognition_type: t
                        }
                    },
                    "link.ab_test.exposure_update": {
                        validation: n.DG,
                        loggedParams: {
                            arb_id: t,
                            dvs_provided: t,
                            in_link_auth_partnerships: d,
                            intent_type: t,
                            is_link_holdback_manager: l,
                            is_returning_link_user: l,
                            recognition_type: t
                        }
                    },
                    "link.instant_debits_holdback.exposure_update": {
                        validation: n.DG,
                        loggedParams: {
                            arb_id: t,
                            dvs_provided: t,
                            element_id: t,
                            eligible_for_link: l,
                            has_spms: l,
                            in_link_auth_partnerships: d,
                            integration_type: t,
                            intent_type: t,
                            is_returning_link_user: l,
                            link_default_opt_in: t,
                            recognition_type: t
                        }
                    },
                    "link.global_holdback.error": {
                        validation: n.DG,
                        loggedParams: {
                            error_message: t,
                            error_stack: t,
                            message: t
                        }
                    },
                    "link.global_holdback.debug": {
                        validation: n.DG,
                        loggedParams: {
                            arbId: r,
                            currentDimensions: (0, n.Ik)({
                                dvs_provided: r,
                                intent_type: r,
                                is_link_holdback_manager: d,
                                is_returning_link_user: d,
                                recognition_type: r
                            }),
                            debug_message: t,
                            dvsProvided: r,
                            enabled: d,
                            initializedSurfaces: r,
                            isCheckout: d,
                            lastExposedDimensions: (0, n.Ik)({
                                dvs_provided: r,
                                intent_type: r,
                                is_link_holdback_manager: d,
                                is_returning_link_user: d,
                                recognition_type: r
                            }),
                            linkAbTest: d,
                            linkAbTestHasVariant: d,
                            linkAbTestVariant: r,
                            linkGlobalHoldback: d,
                            linkGlobalHoldbackHasVariant: d,
                            linkGlobalHoldbackVariant: r,
                            message: r,
                            variant: r
                        }
                    },
                    "link.ir_window_influence.session_created_but_logged_in": {
                        validation: n.DG,
                        loggedParams: {}
                    },
                    "link.login_with_link_auth_intent.error": {
                        validation: n.DG,
                        loggedParams: {
                            error: t
                        }
                    },
                    "link.login_with_link_auth_token.error": {
                        validation: n.DG,
                        loggedParams: {
                            error: t
                        }
                    },
                    "link.login_with_link_auth_token.attempt_fallback_credential_login": {
                        validation: n.DG,
                        loggedParams: {
                            element: t
                        }
                    },
                    "link.login_with_link_auth_token.retry_fallback_credential_login": {
                        validation: n.DG,
                        loggedParams: {
                            element: t
                        }
                    },
                    "link.universal_link_modal.already_open": {
                        validation: n.DG,
                        loggedParams: {
                            element_id: r
                        }
                    },
                    "link.universal_link_modal.already_closed": {
                        validation: n.DG,
                        loggedParams: {}
                    },
                    "link.intersection_observer_open_triggered": {
                        validation: n.DG,
                        loggedParams: {}
                    },
                    "link.intersection_observer_spinner_triggered": {
                        validation: n.DG,
                        loggedParams: {}
                    },
                    "link.cookied_card_display.no_card_details": {
                        validation: n.DG,
                        loggedParams: {}
                    },
                    "link.cookied_balance_display.no_balance_details": {
                        validation: n.DG,
                        loggedParams: {}
                    },
                    "link.cookied_klarna_display.no_klarna_details": {
                        validation: n.DG,
                        loggedParams: {}
                    },
                    "link.cookied_klarna_display.no_klarna_plan_option": {
                        validation: n.DG,
                        loggedParams: {}
                    },
                    "link.cookied_klarna_display.no_klarna_payment_session": {
                        validation: n.DG,
                        loggedParams: {}
                    },
                    "link.assert_secure_click_check": {
                        validation: n.DG,
                        loggedParams: {
                            consumerHasPreviousMerchantRelationship: l,
                            element_id: t,
                            foundConsumerSessionWithPartialCookie: l,
                            isContainerVisible: l,
                            isSecure: l,
                            isTrusted: l
                        }
                    },
                    "link.secure_click_candidate": {
                        validation: n.DG,
                        loggedParams: {
                            element_id: r,
                            foundConsumerSessionWithPartialCookie: l,
                            isContainerVisible: l,
                            isTrusted: l
                        }
                    },
                    "link.recollection_required_on_selected_payment_details": {
                        validation: n.DG,
                        loggedParams: {
                            element_id: t,
                            fields: t,
                            paymentDetailType: t
                        }
                    },
                    "link.consumer_unverified_after_ulm_login_attempt": {
                        validation: n.DG,
                        loggedParams: {}
                    },
                    "link.no_secure_click_due_to_recollection_errors": {
                        validation: n.DG,
                        loggedParams: {}
                    },
                    "link.widget_header.close_button_clicked": {
                        validation: n.DG,
                        loggedParams: {
                            element_id: t,
                            parentComponent: t
                        }
                    },
                    "link.steerage.payment_method_promoted": {
                        validation: n.DG,
                        loggedParams: {
                            element_id: t,
                            paymentMethod: t
                        }
                    },
                    "link.steerage.payment_method_clicked": {
                        validation: n.DG,
                        loggedParams: {
                            element_id: r,
                            type: t
                        }
                    },
                    "link.steerage.button_clicked_with_no_key_error": {
                        validation: n.DG,
                        loggedParams: {}
                    },
                    "link.klarna_nux.universal_modal_opened": {
                        validation: n.DG,
                        loggedParams: {
                            element_id: r
                        }
                    },
                    "link.klarna_nux.universal_modal_errored": {
                        validation: n.DG,
                        loggedParams: {}
                    },
                    "link.klarna_nux.payment_session_error": {
                        validation: n.DG,
                        loggedParams: {
                            decline_code: t
                        }
                    },
                    "link.klarna_in_link.experiment.unavailable": {
                        validation: n.DG,
                        loggedParams: {
                            element_id: t,
                            in_link_auth_partnerships: d,
                            reason: t,
                            variant: r
                        }
                    },
                    "link.signup_experiment.invariant_violation": {
                        validation: n.DG,
                        loggedParams: {
                            attempted_experiment: t,
                            attempted_variant: t,
                            already_exposed_experiment: t,
                            already_exposed_variant: t
                        }
                    },
                    "link.403_fallback_verification_triggered": {
                        validation: n.DG,
                        loggedParams: {}
                    },
                    "link.403_fallback_verification.fatal_error.already_triggered": {
                        validation: n.DG,
                        loggedParams: {}
                    },
                    "link.403_fallback_verification.no_verification_types": {
                        validation: n.DG,
                        loggedParams: {}
                    },
                    "link.403_fallback_verification.verification.start": {
                        validation: n.DG,
                        loggedParams: {
                            fallbackVerificationType: t
                        }
                    },
                    "link.403_fallback_verification.verification.otp_sent": {
                        validation: n.DG,
                        loggedParams: {
                            fallbackVerificationType: t
                        }
                    }
                },
                g = (0, n.me)(n.x8, {
                    frame_width: _
                }, p),
                h = g.outgoingSchema,
                k = g.joinParams
        }
    }
]);