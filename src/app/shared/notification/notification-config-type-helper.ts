import NotificationConfigType from './notification-config-type';

export default class NotificationConfigTypeCast {
  public static toString(
    notificationConfigType: NotificationConfigType,
  ): string {
    let result = '';

    if (notificationConfigType) {
      try {
        result = NotificationConfigType[notificationConfigType];
      } catch {
        result = '';
      }
    }

    return result;
  }
}
