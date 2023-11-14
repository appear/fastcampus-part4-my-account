import Image from 'next/image'

function ImagePage() {
  return (
    <div>
      <Image
        src="https://cdn.pixabay.com/photo/2023/08/19/05/24/starry-sky-8199764_1280.jpg"
        width={2000}
        height={2000}
        alt=""
      />
      <Image
        src="https://cdn.pixabay.com/photo/2023/08/15/09/21/camera-8191564_1280.jpg"
        width={2000}
        height={2000}
        alt=""
      />
      <Image
        src="https://cdn.pixabay.com/photo/2023/10/11/18/59/girl-8309312_1280.jpg"
        width={2000}
        height={2000}
        alt=""
      />
      <Image
        src="https://cdn.pixabay.com/photo/2023/11/03/15/03/waterfall-8363216_1280.jpg"
        width={2000}
        height={2000}
        alt=""
      />
    </div>
  )
}

export default ImagePage
