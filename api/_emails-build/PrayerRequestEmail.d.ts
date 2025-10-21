type PrayerRequestEmailProps = {
    name: string;
    email: string;
    requestType: string;
    urgent: boolean;
    isPrivate: boolean;
    request: string;
};
export default function PrayerRequestEmail({ name, email, requestType, urgent, isPrivate, request, }: PrayerRequestEmailProps): import("react/jsx-runtime").JSX.Element;
export {};
