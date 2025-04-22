import Vue from 'vue'
import dateFormatter from '@/common/js/util/DateFormatter'


function capitalize (value) {
    if (!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
}

Vue.filter('dataFormat', capitalize)
