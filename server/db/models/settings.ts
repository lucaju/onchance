import { model, Model, Schema } from 'mongoose';

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

const settingsSchema = new Schema<ISettings, Model<ISettings>>(
  {
    bot: {
      initialDelay: {
        min: Number,
        max: Number,
      },
      typingTimePerCharacter: {
        min: Number,
        max: Number,
      },
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);

settingsSchema.methods.toJSON = function () {
  const settings = this.toObject();
  delete settings._id;
  return settings;
};

export const Settings = model<ISettings, Model<ISettings>>(
  'Settings',
  settingsSchema
);

export default Settings;
