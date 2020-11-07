export enum NotificationConfigType {
    information = 1,
    success = 2,
    warning = 3,
    error = 4
}

export class NotificationConfigTypeCast {

    public static toString(notificationConfigType: NotificationConfigType): string {
        let result = '';

        if (notificationConfigType) {
            try {
                result = NotificationConfigType[notificationConfigType];
            }
            catch {
                result = '';
            }
        }

        return result;
    }
}
