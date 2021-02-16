import BaseMask from './_base.mask'
import CustomMask from './custom.mask'
import {format} from 'date-fns'

const DATETIME_MASK_SETTINGS = {
    format: 'DD/MM/YYYY HH:mm:ss'
};

export default class DatetimeMask extends BaseMask {
    static getType() {
        return 'datetime'
    }

    getValue(value, settings) {
        const mergedSettings = this._getMergedSettings(settings)
        const mask = this.getMask(value, mergedSettings)

        return CustomMask.shared.getValue(value, { mask })
    }

    getRawValue(maskedValue, settings) {
        const mergedSettings = this._getMergedSettings(settings)
        return format(maskedValue, mergedSettings.format, true)
    }

    isDate(date) {
        return date instanceof Date && !isNaN(date.valueOf())
    }

    validate(value, settings) {
        const maskedValue = this.getValue(value, settings)
        const mergedSettings = this._getMergedSettings(settings)
        const isDateValid = this.isDate(format(maskedValue, mergedSettings.format, true))
        return isDateValid
    }

    _getMergedSettings(settings) {
        return super.mergeSettings(DATETIME_MASK_SETTINGS, settings)
    }

    getMask(value, settings) {
        let mask = ''

        for (const i = 0; i < settings.format.length; i++) {
            mask += settings.format[i].replace(/[a-zA-Z]+/g, '9')
        }

        return mask
    }
}
