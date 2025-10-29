interface LineWebhookBody {
  events: {
    type: string;
    replyToken: string;
    source: {
      userId: string;
      type: string;
    };
    timestamp: number;
    message: {
      id: string;
      type: string;
      text: string;
    };
  }[];
}

export type { LineWebhookBody };
