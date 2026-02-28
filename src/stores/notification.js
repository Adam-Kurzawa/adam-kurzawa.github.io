import { defineStore } from 'pinia'

export const useNotificationStore = defineStore('notification', {
    state: () => {
        return {
            notifications: []
        }
    },
    getters: {
        getNotifications: (state) => state.notifications
    },
    actions: {
        success(msg) {
            const notification = { value: msg, type: 'success', id: crypto.randomUUID() }
            this.notifications.push(notification)
            setTimeout(() => {
                this.notifications = this.notifications.filter(n => n.id !== notification.id)
            }, 5_000)
        },
        warning(msg) {
            const notification = { value: msg, type: 'warning', id: crypto.randomUUID() }
            this.notifications.push(notification)
            setTimeout(() => {
                this.notifications = this.notifications.filter(n => n.id !== notification.id)
            }, 5_000)
        },
        error(msg) {
            const notification = { value: msg, type: 'error', id: crypto.randomUUID() }
            this.notifications.push(notification)
            setTimeout(() => {
                this.notifications = this.notifications.filter(n => n.id !== notification.id)
            }, 5_000)
        },
        info(msg) {
            const notification = { value: msg, type: 'info', id: crypto.randomUUID() }
            this.notifications.push(notification)
            setTimeout(() => {
                this.notifications = this.notifications.filter(n => n.id !== notification.id)
            }, 5_000)
        }
    }
})