export default function getListStudentIds(array) {
  if (!(array instanceof Array)) {
    return [];
  }
  return array.map((student) => student.id);
}
