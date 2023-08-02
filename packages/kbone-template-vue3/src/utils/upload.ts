import { request } from '@/utils'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import VODUpload from '@/libs/aliyun-upload-sdk-1.0.0.min.js'

export const upload = async (
  serialNumber: string,
  url: string,
  onFinish: (imageUrl: string) => void
) => {
  const payload = await request.post(`/api/aliyun/media/images/create`, { serialNumber })
  const token = payload.data as {
    uploadAuth: string
    uploadAddress: string
    imageId: string
    imageUrl: string
  }

  const uploader = new VODUpload({
    timeout: 60000,
    region: 'cn-beijing',
    // 添加文件成功
    addFileSuccess(uploadInfo: unknown) {
      console.log(`addFileSuccess:${JSON.stringify(uploadInfo)}`)
    },
    // 开始上传
    onUploadstarted(uploadInfo: unknown) {
      console.log(`onUploadStarted:${JSON.stringify(uploadInfo)}`)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      uploader.setUploadAuthAndAddress(
        uploadInfo,
        token.uploadAuth,
        token.uploadAddress,
        token.imageId
      )
    },
    // 文件上传进度，单位：字节, 可以在这个函数中拿到上传进度并显示在页面上
    onUploadProgress(uploadInfo: unknown, totalSize: unknown, progress: number) {
      // console.log(
      //     `${JSON.stringify(uploadInfo)}|${totalSize}|${progress}`
      // )
      // console.log("onUploadProgress:file:" + uploadInfo.file.name + ",
      // fileSize:" + totalSize + ", percent:" + Math.ceil(progress * 100) + "%")
      const progressPercent = Math.ceil(progress * 100)
      console.log(`文件上传中...${progressPercent}`)
    },
    // 文件上传成功
    onUploadSucceed(uploadInfo: unknown) {
      console.log('文件上传完毕', JSON.stringify(uploadInfo))
      onFinish(token.imageUrl)
    },
    // 全部文件上传结束
    onUploadEnd(uploadInfo: unknown) {
      console.log(`onUploadEnd: ${JSON.stringify(uploadInfo)}`)
    }
  })

  uploader.addFile({ url }, null, null, null, '{}')
  return uploader as { startUpload: () => void }
}
