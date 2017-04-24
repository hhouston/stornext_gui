export function fetchFiles(root) {
  return (
    $.ajax({
      method: "GET",
      url: 'http://localhost:9000/test?root=%2F'
      // url: 'http://requestb.in/1f87ot71'
    })
  );
}
