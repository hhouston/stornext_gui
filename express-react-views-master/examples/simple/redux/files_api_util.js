export const fetchFiles = (root) => (
   $.ajax({
    method: "GET",
    url: 'http://localhost:8080/test',
    data: root
  })
);
