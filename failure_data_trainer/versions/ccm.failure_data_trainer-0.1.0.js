/**
 * @overview ccm component for traning th failure data recognising
 * @author André Kless <andre.kless@web.de> 2017-2018
 * @license The MIT License (MIT)
 */

( function () {

  const component = {

    name: 'failure_data_trainer',

    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-16.7.0.js',

    config: {
      templates: {
        'textarea':  {
          "class": "container",
          "inner": {
            "class": "form-group",
            "inner": [
              {
                "tag": "label",
                "for": "comment",
                "inner": "Comment:"
              },
              {
                "tag": "textarea",
                "id": "comment",
                "class": "note form-control",
                "rows": 2
              }
            ]
          }
        }
      },
      mapping: [
        {
          "title": "1. Contact Details",
          "type": "accordion",
          "color": "success",
          "entries": [
            {
              "title": "1.1  Study Contact List",
              "content": [
                {
                  "type": "table",
                  "key": "head_1",
                  "markable": true,
                  "failure": true,
                },
                {
                  "type": "table",
                  "key": "study_contact_list",
                  "markable": true,
                  "failure": true
                }
              ]
            },
            {
              "title": "1.2  Site Visit Log",
              "content": [
                {
                  "type": "table",
                  "key": "head_2",
                  "markable": true,
                  "failure": true
                },
                {
                  "type": "table",
                  "key": "site_visit_log",
                  "markable": true,
                  "failure": true
                }
              ]
            }
          ]
        },
        {
          "title": "3. Subject Information",
          "type": "accordion",
          "color": "success",
          "entries": [
            {
              "title": "3.1  Subject Screening / Enrollment Log",
              "content": [
                {
                  "type": "table",
                  "key": "head_2",
                  "markable": true,
                  "failure": true,
                },
                {
                  "type": "table",
                  "key": "subject_screening_log",
                  "markable": true,
                  "failure": true
                }
              ]
            },
            {
              "title": "3.2 Adverse Event Log",
              "content": [
                {
                  "type": "table",
                  "key": "head_2",
                  "markable": true,
                  "failure": true
                },
                {
                  "type": "table",
                  "key": "adverse_event_log_site",
                  "markable": true,
                  "failure": true
                },
                {
                  "type": "table",
                  "key": "adverse_event_log_site_footer"
                }
              ]
            },
            {
              "title": "3.3 Serious Adverse Event Log",
              "content": [
                {
                  "type": "table",
                  "key": "head_2",
                  "markable": true,
                  "failure": true
                },
                {
                  "type": "table",
                  "key": "serious_adverse_event_log_site",
                  "markable": true,
                  "failure": true
                },
                {
                  "type": "table",
                  "key": "serious_adverse_event_log_site_footer"
                }
              ]
            },
            {
              "title": "3.4 Fax Cover Sheet SAE Report",
              "content": [
                {
                  "type": "content",
                  "key": "fax_cover_sheet_sae_report",
                  "markable": true,
                  "failure": true
                }
              ]
            },
            {
              "title": "3.5 Informed Consent Verification Log",
              "content": [
                {
                  "type": "table",
                  "key": "head_2",
                  "markable": true,
                  "failure": true
                },
                {
                  "type": "table",
                  "key": "informed_consent_verification_log",
                  "markable": true,
                  "failure": true
                }
              ]
            }
          ]
        },
        {
          "title": "4. Protocol and Amendments",
          "type": "accordion",
          "color": "success",
          "entries": [
            {
              "title": "4.1 Signed Protocol",
              "content": [
                {
                  "type": "content",
                  "key": "signed_protocol",
                  "markable": true,
                  "failure": true,
                }
              ]
            },
            {
              "title": "4.3 Protocol Signature Page PI",
              "content": [
                {
                  "type": "content",
                  "key": "protocol_signature_page_pi",
                  "markable": true,
                  "failure": true
                }
              ]
            }
          ]
        },
        {
          "title": "5. Safety Information",
          "type": "accordion",
          "color": "success",
          "entries": [
            {
              "title": "5.1 Investigator Brochure / Approved Product Information",
              "content": [
                {
                  "type": "content",
                  "key": "investigator_brochure",
                  "markable": true,
                  "failure": true,
                }
              ]
            },
            {
              "title": "5.3 IB Acknowledgment of Receipt PI",
              "content": [
                {
                  "type": "table",
                  "key": "head_1",
                  "markable": true,
                  "failure": true
                },
                {
                  "type": "table",
                  "key": "acknowledgement_of_receipt_middle",
                  "markable": true,
                  "failure": true
                },
                {
                  "type": "table",
                  "key": "acknowledgement_of_receipt",
                  "markable": true,
                  "failure": true
                }
              ]
            }
          ]
        },
        {
          "title": "6. IEC/IRB/Regulatory",
          "type": "accordion",
          "color": "success",
          "entries": [
            {
              "title": "6.1 Submissions",
              "content": [
                {
                  "type": "content",
                  "key": "submission",
                  "markable": true,
                  "failure": true
                }
              ]
            },
            {
              "title": "6.2 Opinions and Approvals (including Central IRB Justification form)",
              "content": [
                {
                  "type": "content",
                  "key": "opinions_and_approvals",
                  "markable": true,
                  "failure": true
                }
              ]
            },
            {
              "title": "6.6 Blank Set of Informed Consent Forms and Subject Info Sheets (All Approved Versions)",
              "content": [
                {
                  "type": "content",
                  "key": "blank_informed_consent_forms"
                }
              ]
            },
            {
              "title": "6.7 Regulatory Authority Notification, Approval and Amendments",
              "content": [
                {
                  "type": "content",
                  "key": "regulatory_authority_notification",
                  "markable": true,
                  "failure": true
                }
              ]
            }
          ]
        },
        {
          "title": "7. Investigator Agreement",
          "type": "accordion",
          "color": "success",
          "entries": [
            {
              "title": "7.1 Confidential Disclosure Agreement",
              "content": [
                {
                  "type": "content",
                  "key": "confidential_disclosure_agreement",
                  "markable": true,
                  "failure": true
                }
              ]
            },
            {
              "title": "7.2 Clinical Trial Agreement / Financial Contract)",
              "content": [
                {
                  "type": "content",
                  "key": "clinical_trial_agreement",
                  "markable": true,
                  "failure": true
                }
              ]
            },
            {
              "title": "7.3 Indemnification/Insurance Certificate (if applicable)",
              "content": [
                {
                  "type": "content",
                  "key": "indemnification_insurance_certificate",
                  "markable": true,
                  "failure": true
                }
              ]
            },
            {
              "title": "7.5 Financial Disclosure Forms",
              "content": [
                {
                  "type": "content",
                  "key": "financial_disclosure_forms",
                  "markable": true,
                  "failure": true
                }
              ]
            },
            {
              "title": "7.6 Site and Investigator Qualification (according to AMG Novelle 16)",
              "content": [
                {
                  "type": "content",
                  "key": "site_and_investigator_qualification",
                  "markable": true,
                  "failure": true,
                }
              ]
            }
          ]
        },
        {
          "title": "8. Site Staff Details",
          "type": "accordion",
          "color": "success",
          "entries": [
            {
              "title": "8.1 Site Delegation Log (names, roles and responsibilities)",
              "content": [
                {
                  "type": "table",
                  "key": "head_2",
                  "markable": true,
                  "failure": true
                },
                {
                  "type": "content",
                  "key": "site_delegation_log_middle"
                },
                {
                  "type": "table",
                  "key": "site_delegation_log",
                  "markable": true,
                  "failure": true
                },
                {
                  "type": "content",
                  "key": "site_delegation_log_footer"
                }
              ]
            },
            {
              "title": "8.2 CV, GCP, ML of PI",
              "content": [
                {
                  "type": "content",
                  "key": "curriculum_vitae_of_pi",
                  "markable": true,
                  "failure": true
                },
                {
                  "type": "content",
                  "key": "certificate_of_attendance_of_pi",
                  "markable": true,
                  "failure": true
                },
                {
                  "type": "content",
                  "key": "medical_license_of_pi",
                  "markable": true,
                  "failure": true
                }
              ]
            },
            {
              "title": "8.3 CV GCP, ML of Sub-Investigator(s)",
              "content": [
                {
                  "type": "content",
                  "key": "curriculum_vitae_of_sub_investigator",
                  "markable": true,
                  "failure": true
                },
                {
                  "type": "content",
                  "key": "certificate_of_attendance_of_sub_investigator",
                  "markable": true,
                  "failure": true
                },
                {
                  "type": "content",
                  "key": "medical_license_of_sub_investigator",
                  "markable": true,
                  "failure": true
                }
              ]
            },
            {
              "title": "8.4 CV of Other Relevant Study Staff (if required)",
              "content": [
                {
                  "type": "content",
                  "key": "curriculum_vitae_of_other_staff",
                  "markable": true,
                  "failure": true
                }
              ]
            },
            {
              "title": "8.5 Study specific Investigator/Site Staff Training Record",
              "content": [
                {
                  "type": "table",
                  "key": "head_2",
                  "markable": true,
                  "failure": true
                },
                {
                  "type": "table",
                  "key": "site_staff_training_record",
                  "markable": true,
                  "failure": true
                }
              ]
            }
          ]
        },
        {
          "title": "9. Investigational Product (IP) / Test Article",
          "type": "accordion",
          "color": "success",
          "entries": [
            {
              "title": "9.1 Drug Inventory List",
              "content": [
                {
                  "type": "table",
                  "key": "head_2",
                  "markable": true,
                  "failure": true
                },
                {
                  "type": "table",
                  "key": "drug_inventory_list",
                  "markable": true,
                  "failure": true
                }
              ]
            },
            {
              "title": "9.2 Drug Dispensation & Accountability Log Subject (shipment, dispensing, return or destruction)",
              "content": [
                {
                  "type": "table",
                  "key": "head_2",
                  "markable": true,
                  "failure": true
                },
                {
                  "type": "table",
                  "key": "drug_dispensation_and_accountability_log",
                  "markable": true,
                  "failure": true
                }
              ]
            },
            {
              "title": "9.6 Drug Storage Temperature Log (e.g freezer, fridge, RT)",
              "content": [
                {
                  "type": "table",
                  "key": "head_2",
                  "markable": true,
                  "failure": true
                },
                {
                  "type": "content",
                  "key": "storage_temperature_log",
                  "markable": true,
                  "failure": true
                },
                {
                  "type": "table",
                  "key": "temperature_log",
                  "markable": true,
                  "failure": true,
                  "generic": true
                }
              ]
            },
          ]
        },
        {
          "title": "14. Confidential Site Documents",
          "type": "accordion",
          "color": "success",
          "entries": [
            {
              "title": "14.1 Subject Identification Log",
              "content": [
                {
                  "type": "table",
                  "key": "head_2",
                  "markable": true,
                  "failure": true
                },
                {
                  "type": "table",
                  "key": "subject_identification_log",
                  "markable": true,
                  "failure": true
                },
                {
                  "type": "content",
                  "key": "subject_identification_log_footer"
                }
              ]
            },
            {
              "title": "14.2 Signed Copies of Informed Consent Forms and Subject Info Sheets (All Approved Versions)",
              "content": [
                {
                  "type": "content",
                  "key": "informed_consent_form",
                  "markable": true,
                  "failure": true
                }
              ]
            },
            {
              "title": "14.3 Source Documents Available for All Subjects",
              "content": [
                {
                  "type": "content",
                  "key": "source_documents_available_for_all_subjects",
                  "markable": true,
                  "failure": true
                }
              ]
            }
          ]
        },
        {
          "title": "15. Study Specific Documents",
          "type": "accordion",
          "color": "success",
          "entries": [
            {
              "title": "15.2 Protocol Deviation Tracking Log",
              "content": [
                {
                  "type": "table",
                  "key": "head_2",
                  "markable": true,
                  "failure": true
                },
                {
                  "type": "table",
                  "key": "protocol_deviation_tracking_log",
                  "markable": true,
                  "failure": true
                },
                {
                  "type": "content",
                  "key": "protocol_deviation_tracking_log_footer"
                }
              ]
            }
          ]
        }
      ],
      content_mapping: {
        "fax_cover_sheet_sae_report": [
          "protocol-number",
          "site-number",
          "principal-investigator-mame",
          "cra-mame",
          "telephone-number",
          "fax-number",
          "number-of-pages",
          "initial",
          "follow-up",
          "study-number-on-every-page",
          "pages-legible",
          "adverse-event-page",
          "complementary-pages",
          "medical-history",
          "laboratory-data"
        ],

        "signed_protocol": [
          "title-of-the-study",
          "short-study-title",
          "protocol-version-number",
          "protocol-date",
          "sponsor-name",
          "eudract-number",
          "protocol-number",
          "study-sponsor-signature",
          "study-sponsor-date",
          "study-sponsor-name",
          "study-sponsor-position",
          "chef-investigator-signature",
          "chef-investigator-date",
          "chef-investigator-name",
          "chef-investigator-position"
        ],

        "protocol_signature_page_pi": [
          "protocol-title",
          "protocol-number",
          "protocol-version",
          "protocol-date",
          "sponsor-name",
          "principal-investigator-name",
          "principal-investigator-signature",
          "date"
        ],

        "investigator_brochure": [
          "sponsor-name",
          "sponsor-street",
          "sponsor-city",
          "sponsor-zip-code",
          "sponsor-country",
          "sponsor-telephone-number",
          "sponsor-fax-number",
          "product",
          "version-number",
          "release-date",
          "replaces-previous-version-number",
          "replaces-previous-version-date"
        ],

        "submission": [
          "sponsor_city",
          "submission_date",
          "sponsor_name",
          "sponsor_street",
          "sponsor_zip_code",
          "sponsor_country",
          "sponsor_representative_name",
          "sponsor_representative_email",
          "sponsor_representative_tel",
          "sponsor_representative_fax",
          "eduract_number",
          "protocol_number",
          "dosage_form",
          "title_of_trial",
          "item_1",
          "item_2",
          "item_3",
          "sponsor_representative_signature",
          "role_sponsor_representative"
        ],

        "confidential_disclosure_agreement": [
          "version",
          "version_date",
          "investigator_name",
          "site_address",
          "sponsor_name",
          "sponsor_address",
          "study_number",
          "study_title",
          "investigator_name",
          "investigator_signature",
          "date"
        ],

        "certificate_of_attendance_of_pi": [
          "name_on_gcp",
          "date_of_gcp_training"
        ],

        "medical_license_of_pi": [
          "university_name",
          "name_on_ml",
          "date_of_ml",
          "univ_representative_signature",
          "univ_representative_signature_date"
        ],

        "curriculum_vitae_of_pi": [
          "name_on_cv",
          "position_title",
          "work_place",
          "work_street",
          "work_city",
          "work_country"
        ],

        "certificate_of_attendance_of_sub_investigator": [
          "name_on_gcp",
          "date_of_gcp_training"
        ],

        "medical_license_of_sub_investigator": [
          "university_name",
          "name_on_ml",
          "date_of_ml",
          "univ_representative_signature",
          "univ_representative_signature_date"
        ],

        "curriculum_vitae_of_sub_investigator": [
          "name_on_cv",
          "position_title",
          "work_place",
          "work_street",
          "work_city",
          "work_country"
        ],

        "curriculum_vitae_of_other_staff": [
          "name_on_cv",
          "position_title",
          "work_place",
          "work_street",
          "work_city",
          "work_country"
        ],

        "storage_temperature_log": [
          "storage_temperature",
          "storage_location",
          "id_thermometer"
        ],

        "site_and_investigator_qualification": [
          "protocol_number",
          "eudract_number",
          "study-title",
          "investigator_place",
          "investigator_date",
          "investigator_name",
          "investigator_signature",
          "deputy_investigator_place",
          "deputy_investigator_date",
          "deputy_investigator_name",
          "deputy_investigator_signature"
        ],

        "informed_consent_form": [
          "eudract",
          "site_number",
          "protocol_number",
          "screening_number",
          "title_of_project",
          "name_of_principal_investigator",
          "icf_date",
          "icf_version",
          "name_of_participant",
          "date_signed_participant",
          "signature_participant",
          "name_of_investigator_taking_consent",
          "date_signed_investigator",
          "signature_investigator",
          "1", "2", "3", "4", "5", "6",
        ],

        "icf": [
          "subject_date_signed",
          "subject_time_signed",
          "consenting_person_date_signed",
          "consenting_person_time_signed",
          "consenting_person_name",
          "icf_version",
          "icf_version_date"
        ]
      },
      source_data: [ "ccm.store", { "store": "clires_test_data", url: "https://ccm2.inf.h-brs.de" } ],
      corrupt_data: [ "ccm.store", { "store": "clires_corrupt_data", url: "https://ccm2.inf.h-brs.de" } ],
      founded_failures: [ "ccm.store", { "store": "clires_found_failures", url: "http://localhost:8080" } ],
      table: {
        comp: [ "ccm.component", "https://ccmjs.github.io/tkless-components/table/versions/ccm.table-3.0.0.js" ],
        configs: [ "ccm.store", "../../v3/resources/table_configs.js" ],
      },
      content: {
        comp: [ "ccm.component", "https://ccmjs.github.io/akless-components/content/versions/ccm.content-4.0.0.js" ],
        configs: [ "ccm.store", "../../v3/resources/content_configs.js" ],
      },
      accordion: [ "ccm.component", "https://ccmjs.github.io/tkless-components/accordion/versions/ccm.accordion-1.0.0.js", {
        css: [ "ccm.load", "../../v3/resources/default.css" ]
      } ],
      marking_failure: [ "ccm.component", "https://ccmjs.github.io/tkless-components/marking_words/versions/ccm.marking_words-1.0.0.js" ],
      css: [ "ccm.load",
        { context: "head", url: "https://ccmjs.github.io/tkless-components/libs/bootstrap/css/font-face.css" },
        "https://ccmjs.github.io/tkless-components/libs/bootstrap/css/bootstrap.css"
      ]
    },

    Instance: function () {
      /**
       * own reference for inner functions
       * @type {Instance}
       */
      const self = this;

      /**
       * privatized instance members
       * @type {object}
       */
      let my;

      /**
       * shortcut to help functions
       * @type {Object.<string,function>}
       */
      let $;

      this.init = callback => {

        if ( self.user ) self.user.onchange = () => self.start();

        callback();
      };

      this.ready = callback => {
        // set shortcut to help functions
        $ = self.ccm.helper;

        // privatize all possible instance members
        my = $.privatize( self );

        if ( self.logger ) self.logger.log( 'ready', my );

        callback();
      };


      this.start = callback => {

        render( my.mapping,  self.element );

        //callback && callback();

        function render( mapping, element ) {
          $.setContent( element, '' );
          mapping.map( obj => {

            if ( obj.title ) $.append( element, $.html( { tag: 'h3', inner: obj.title } ) );
            const div = document.createElement( 'div' );
            $.append( element, div );

            switch ( obj.type ) {

              case 'accordion':
                const config = { entries: [] };
                if ( obj.color ) config.color = obj.color;
                obj.entries.map( obj => {
                  const entry = {
                    title: obj.title,
                    content: document.createElement( 'div' )
                  };
                  config.entries.push( entry );
                  render( obj.content, entry.content );
                } );
                config.root = div;
                my.accordion.start( config );
                break;

              case 'table':
                my.table.configs.get( obj.key, config => {

                  my.source_data.get( obj.key, dataset => {

                    let failure_data;

                    if ( obj.failure ) {
                      my.corrupt_data.get( obj.key, result => {

                        // source table data should not be changed => clone
                        const clone = $.clone( dataset );

                        failure_data = result || { failures: {} };
                        failure_data.failures = $.toDotNotation( failure_data.failures );

                        $.integrate( failure_data.failures, clone );

                        proceed( clone );

                      } );
                    }

                    else proceed ( dataset );

                    function proceed ( dataset ) {

                      if ( dataset ) {
                        if ( !obj.editable ) {
                          // For simulation view no input fields needed, so delete col_settings from table_config
                          delete config.col_settings;
                          config.add_row = false;
                          config.submit = false;
                        }

                        if ( obj.filter_values !== undefined ) {
                          let filterd_data = { values: [] };
                          dataset.values.map( ( value, i ) => {
                            if ( selected_dropdown && ( value[ obj.filter_values ] == selected_dropdown ) ) {
                              filterd_data.values.push( dataset.values[ i ] );
                            }
                          } );

                          dataset = filterd_data;
                        }

                        config = { key: config, data: dataset };
                      }

                      if ( obj[ 'save_source' ] === 'crf' ) {
                        config.onfinish = {
                          "log": true, "alert": "Saved!",

                          "store": {
                            "settings": my.source_data.source(),
                            "key": [
                              selected_dropdown,
                              selected_visit,
                              selected_crf_nr,
                              obj.key
                            ]
                          }
                        };
                      }
                      else {
                        config.onfinish = {
                          "log": true, "alert": "Saved!",

                          "store": {
                            "settings": my.source_data.source(),
                            "key": obj.key
                          }
                        };

                        if ( obj.generate_temperature ) {
                          config.onfinish.callback = function ( instance ) {
                            my.source_data.get( 'temperature_log', temp_data => {
                              if ( !temp_data || instance.getValue().values[0][0] !== dataset.values[0][0]) {
                                my.table.configs.get( 'temperature_log', config => {
                                  let lower_limit = [];
                                  let upper_limit = [];
                                  my.source_data.get( 'storage_temperature_log', dataset => {
                                    let range =  ( dataset.values[0][0] ).split( '-' );
                                    const median = ( Number ( range[ 0 ] ) + Number( range[ 1 ] ) ) / 2;

                                    for ( let i = 0; i < 20; i++) {
                                      // generate random temperature ( 22,3 )
                                      lower_limit[ i ] = ( Math.random() * ( median -  Number ( range[ 0 ] ) ) + Number( range[ 0 ] ) ).toPrecision( 3 );
                                      upper_limit[ i ] = ( Math.random() * ( Number ( range[ 1 ] ) - median ) + median ).toPrecision( 3 );
                                    }

                                    let values = [];

                                    for ( let i = 0; i < lower_limit.length; i++) {
                                      values[ i ] =[ "Date of Record DD/MM/YY", lower_limit[ i ], upper_limit [ i ], dataset.values[ 0 ][ 3 ] ];
                                    }

                                    config.values =  values;

                                    config.key = 'temperature_log';

                                    my.source_data.set( config );

                                  } );
                                } );
                              }
                            } );
                          }
                        }
                      }

                      config.root = div;

                      // start table instance with considered failures
                      my.table.comp.start( config, instance => {

                        // check table lines
                        if ( obj.checkable ) {
                          addColumn( instance );

                          instance.element.appendChild( $.html( my.templates.textarea ) );

                          const save_faunded_failures = $.html ({
                            "tag": "button",
                            "class": "btn btn-default pull-right",
                            "typ": "submit",
                            "inner": "Save",
                            "onclick": "%save_founded_failures%"
                          }, {
                            save_founded_failures: ( event ) => {
                              let checkbox_values = [];
                              event.preventDefault();

                              [...instance.element.querySelectorAll( 'tbody > tr' )].map( tr => {
                                checkbox_values.push( tr.lastChild.querySelector( 'input' ).checked );
                              } );

                              const founded_failures_data = {
                                key:  [ self.user.data().user, obj.key ],
                                founded: checkbox_values,
                                comment: instance.element.querySelector( 'textarea' ).value
                              };

                              my.founded_failures.set( founded_failures_data, () => alert( 'saved' ) );
                              return false;
                            }
                          } );

                          instance.element.appendChild(  save_faunded_failures );
                        }

                        //if ( obj.markable ) my.marking_failure.start( { root: div, inner: instance.element } );

                        if ( obj[ 'save_failures' ] ) {

                          [ ...instance.element.querySelectorAll( 'button' ) ].map( button => { button.remove(); } );
                          markFailures();

                          instance.onchange = function ( element, value) {
                            saveFailures( element, value );
                            markFailures();
                          };

                          renderSaveFailuresButton();
                        }

                        function markFailures( ) {
                          [... instance.element.querySelectorAll( 'input' ) ].map( input => {
                            input.style.color = '';
                          });

                          for ( const key in failure_data.failures ) {
                            const path = key.split( '.' ); path.shift();
                            path.map( Number );
                            path[ 0 ] = ++path[ 0 ]; path[ 1 ] = ++path[ 1 ];
                            const input = instance.element.querySelector( 'input[name="'+path[0]+'-'+path[1]+'"]' );
                            input.style.color = "red";

                          }
                        }

                        function saveFailures( element, value ) {
                          // get input field that was changed
                          const failure_cell = element.getAttribute( 'name' ).split( '-' ).map( Number );

                          // if corrupt value of input field was deleted, delete it also from failure data
                          if ( value === dataset.values[ failure_cell[ 0 ] - 1 ][ failure_cell[ 1 ] - 1 ] ) {
                            value = '';
                          }

                          failure_data.failures[ 'values.'+( failure_cell[0]-1 )+'.'+( failure_cell[1]-1) ] = value;
                          failure_data.key = obj.key;
                        }

                        function renderSaveFailuresButton() {

                          const save_btn = $.html ({
                            "tag": "button",
                            "class": "btn btn-default pull-right",
                            "typ": "submit",
                            "inner": "Submit",
                            "onclick": "%save_failures%"
                          }, {
                            save_failures: function ( event ) {
                              event.preventDefault();
                              const cloned_failure_data = $.clone( failure_data );
                              $.solveDotNotation( cloned_failure_data.failures );
                              my.corrupt_data.set( cloned_failure_data, () => alert( 'saved' ) );
                              return false;
                            }
                          } );

                          instance.element.querySelector( '#container' ).appendChild( save_btn );
                        }

                        // Error check for the whole line
                        function addColumn( instance ) {
                          const  icon = { "tag": "th", "inner": "<span class='glyphicon glyphicon-check'></span>" };
                          const radio = { "tag": "td", "inner": { "tag": "input", "type": "checkbox" } };


                          if ( instance.element.querySelector( 'thead' ).hasChildNodes() )
                            instance.element.querySelector( 'thead > tr' ).appendChild( $.html( icon ) );

                          [...instance.element.querySelectorAll( 'tbody > tr' )].map( tr => {
                            tr.appendChild( $.html( radio ) );
                          } );

                        }

                      } );
                    }

                  } );

                } );
                break;

              case 'content':
                my.content.configs.get( obj.key, config => {
                  let placeholder = {};
                  my.source_data.get( obj.key, dataset => {
                    if ( obj.failure ) {
                      my.corrupt_data.get( obj.key, result => {
                        // source table data should not be changed => clone
                        const clone = $.clone( dataset );

                        const failure_data = result || { failures: {} };

                        failure_data.failures = $.toDotNotation( failure_data.failures );

                        $.integrate( failure_data.failures, clone );

                        proceed ( clone );
                      } );
                    }

                    else proceed( dataset );

                    function proceed( dataset ) {

                      if ( dataset ) {
                        for ( const value in dataset.values ) {
                          const cfg = $.clone( config );
                          const child = document.createElement( 'div' );
                          child.classList.add( 'well', 'well-sm' );
                          div.appendChild( child );

                          [ ...my.content_mapping[ obj.key ] ].map( ( name, i ) => {
                            if ( dataset.values[ value ][ i ] === true )
                              placeholder[ name ] = 'checked';
                            else if ( dataset.values[ value ][ i ] === false )
                              placeholder[ name ] = '';
                            else
                              placeholder[ name ] = dataset.values[ value ][ i ];
                          } );
                          cfg.placeholder = placeholder;

                          cfg.root = child;

                          // start table instance with considered failures
                          my.content.comp.start( cfg, instance => {
                            if ( obj.markable )
                              my.marking_failure.start( { root: child, inner: instance.element }, ( instance ) => {
                                instance.element.appendChild( $.html( my.templates.textarea ) );
                                instance.onchange = function (result) {
                                  textarea.value = result.innerHTML+':';
                                };
                              } );
                            if ( obj.key === 'randomisation'){
                              instance.element.querySelector( 'button' ).innerHTML = "Randomisation Number: " + selected_dropdown;
                            }
                          } );
                        }

                      }


                      else  {
                        config.root = div;
                        // start table instance with considered failures
                        my.content.comp.start( config, instance => {
                          if ( obj.markable )
                            my.marking_failure.start( { root: div, inner: instance.element }, ( instance ) => {
                              const textarea = {
                                "class": "container",
                                "inner": {
                                  "class": "form-group",
                                  "inner": [
                                    {
                                      "tag": "label",
                                      "for": "comment",
                                      "inner": "Comment:"
                                    },
                                    {
                                      "tag": "textarea",
                                      "id": "comment",
                                      "class": "note form-control",
                                      "rows": 2
                                    }
                                  ]
                                }
                              };
                              instance.element.appendChild( $.html( textarea ) );
                              instance.onchange = function (result) {
                                textarea.value = result.innerHTML+':';
                              };
                            } );
                          if ( obj.key === 'randomisation'){
                            instance.element.querySelector( 'button' ).innerHTML = "Randomisation Number: " + selected_dropdown;
                          }

                        } );
                      }
                    }

                  } );
                });
                break;
            }

          } );
        }
      };

    }

  };
  
  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();