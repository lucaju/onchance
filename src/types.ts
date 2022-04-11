export interface ISettings {
  bot: {
    initialDelay: {
      min: number;
      max: number;
    };
    typingTimePerCharacter: {
      min: number;
      max: number;
    };
  };
}

export interface IVideo {
  id: string;
  source?: string;
  title?: string;
  author?: string;
  year?: number;
  duration?: string;
  genre?: string;
  language?: string;
  caption?: string;
  tags?: string[];
}

export type DialogueSource = 'user' | 'bot' | 'narrator';

export interface IDialogueResponse {
  type: 'text'| 'video'; //any; //'text';
  text?: string;
  delay?: number;
  typingTime?: number;
};

export interface IDialogueData {
  delay?: number;
};

export interface IDialogue {
  id: number;
  from: DialogueSource,
  responses: IDialogueResponse[],
  
  data?: any;
};