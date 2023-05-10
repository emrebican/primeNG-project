export function onShowToast(
  service: any,
  severity: string,
  summary: string,
  detail: string,
  icon: string
) {
  service.add({
    severity,
    summary,
    detail,
    icon
  });
}
