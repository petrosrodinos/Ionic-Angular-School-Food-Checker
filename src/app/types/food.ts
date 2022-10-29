export interface FoodPhoto {
  blob: Blob;
  base64: string;
}

export interface Food {
  username?: string;
  userAvatar?: string;
  photo?: FoodPhoto;
  firstplate: string;
  secondplate: string;
  description?: string;
  date?: string;
  time?: string;
  userId?: string;
}

export interface FoodPhotoUpload {
  filepath: string;
  webviewPath: string;
}
