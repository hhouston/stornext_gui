export function fetchFiles(root) {
  return (
    $.ajax({
      method: "GET",
      url: 'http://172.16.3.51:9000/test?root=%2F'
    })
  );
}
