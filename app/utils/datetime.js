export default function getId() {
  const d = new Date();
  return 'id' + d.getDate() + d.getMonth() + d.getFullYear() + d.getHours() + d.getMinutes() + d.getSeconds()+d.getMilliseconds();
}
