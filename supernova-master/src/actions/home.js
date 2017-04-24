export function fetchFiles(root) {
  return (
    $.ajax({
      headers: {
        'Content-Type': 'request',
        'Access-Control-Allow-Origin': '*'
      },
      qs: {
        root: root
      },
      method: "GET",
      url: 'http://172.16.3.51:8080/test'
    })
  );
}
