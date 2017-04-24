export function fetchFiles(root) {
  return (
    $.ajax({
      contentType: 'application/json',
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      qs: {
        root: root
      },
      method: "GET",
      // url: 'http://172.16.3.51:8080/test',
      url: 'http://requestb.in/1f87ot71',
      crossDomain: true
    })
  );
}
