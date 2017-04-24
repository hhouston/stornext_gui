export function fetchFiles(root) {
  return (
    $.ajax({
      method: "GET",
      url: 'http://172.16.3.51:8080/test?root=%2F'
    })
  );
}
