import fs from 'fs'
export const deleteFile = async (filename: any) => {

  try {
    await await fs.promises.stat(filename)
  } catch {
    return;
  }

  await fs.promises.unlink(filename)
}