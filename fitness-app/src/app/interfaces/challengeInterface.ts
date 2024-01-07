export interface Challenge {
    title: string;
    previewPath: string;
    numberOfVideos: number;
    videoLength: string;
    fitnessLevel: string;
    information: string;
    videos: {
      [key: string]: {
        videoId: string;
        exerciseInformation: string;
        exerciseRounds: number;
        typeOfExercise: string;
        videoInformation: string;
        videoLength: string;
        videoNumber: string;
        videoUrl: string;
      };
    };
  }