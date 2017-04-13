export const fetchFiles = (root) => (
   $.ajax({
    method: "GET",
    url: 'localhost/files',
    data: root
  })
);
