import BaseMask from './_base.mask'
import CustomMask from './custom.mask'
var dateFns = require('date-fns')

const DATETIME_MASK_SETTINGS = {
    format: 'DD/MM/YYYY HH:mm:ss'
}

export default class DatetimeMask extends BaseMask {
    static getType() {
        return 'datetime'
    }

    getValue(value, settings) {
        let mergedSettings = this._getMergedSettings(settings)
        let mask = this.getMask(value, mergedSettings)

        return CustomMask.shared.getValue(value, { mask })
    }

    getRawValue(maskedValue, settings) {
        let mergedSettings = this._getMergedSettings(settings)
        return dateFns(maskedValue, mergedSettings.format, true)
    }

    validate(value, settings) {
        var maskedValue = this.getValue(value, settings)
        let mergedSettings = this._getMergedSettings(settings)
        var isValid = dateFns(maskedValue, mergedSettings.format, true).isValid()
        return isValid
    }

    _getMergedSettings(settings) {
        return super.mergeSettings(DATETIME_MASK_SETTINGS, settings)
    }

    getMask(value, settings) {
        let mask = ''

        for (var i = 0; i < settings.format.length; i++) {
            mask += settings.format[i].replace(/[a-zA-Z]+/g, '9')
        }

        return mask
    }
}
