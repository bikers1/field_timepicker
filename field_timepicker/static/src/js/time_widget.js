/** @odoo-module **/
import { registry } from "@web/core/registry";
import { useInputField } from "@web/views/fields/input_field_hook";
import time from 'web.time';
import { parseFloatTime } from "@web/views/fields/parsers";;
import { formatFloatTime } from "@web/views/fields/formatters";
const { Component, useRef } = owl;
var Dialog = require('web.Dialog');

/**
 * We define this module for the function of creating a time picker widget
 *
 */

export class FieldTimePicker extends Component {
    static template = 'FieldTimePicker';

    setup() {
        super.setup();
        this.input = useRef('input_time');
        if (this.props.type === "char"){
              useInputField({ getValue: () => this.props.value || "", refName: "input_time" });
        } else if  (this.props.type === "float"){
            useInputField({ getValue: () => this.formattedValue, refName: "input_time",parse: (v) => parseFloatTime(v), });
        }
    }
    get formattedValue() {
        return formatFloatTime(this.props.value);
    }
    /**
     * Click function to validate weather its a char field if yes it will show
       the timepicker else show a waring
     *
     */

    _onClickTimeField(event) {
        var self = this;
        var $input = $(event.currentTarget);
        if (this.props.type === "char"){
          this.props.update(this.input.el.value.replace(FieldTimePicker, ''));
           $input.wickedpicker({
            twentyFour: true,
            title: 'Select Time',
            showSeconds: true,
        });
        $input.wickedpicker('open');
       } else if (this.props.type === "float"){

        //if (this.input.el && this.props.type === "char"){
          this.props.update(parseFloatTime(this.input.el.value.replace(FieldTimePicker, '')));
           $input.wickedpicker({
            twentyFour: true,
            title: 'Select Time',
            showSeconds: false,
        });
        $input.wickedpicker('open');
       }
       else{
        Dialog.alert(this,
        "Have been not support for other fields type other then char or float type")
        return false;
       }
    }
}

registry.category("fields").add("timepicker", FieldTimePicker);
