export default function UploadData() {
  return (
    <form method="post" action="/api/update-data" encType="multipart/form-data">
      <input type="file" name="1s_dump"/>
      <button type="submit">Отправить</button>
    </form>
  );
}
