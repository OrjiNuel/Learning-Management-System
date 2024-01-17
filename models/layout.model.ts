import mongoose, { Document, Model, Schema } from "mongoose";

interface FaqItems extends Document {
  question: string;
  answer: string;
}

interface Category extends Document {
  title: string;
}

interface BannerImage extends Document {
  public_id: string;
  url: string;
}

interface Layout extends Document {
  type: string;
  faq: [FaqItems];
  categories: [Category];
  banner: {
    image: BannerImage;
    title: string;
    subtitle: string;
  };
}

const faqSchema = new Schema<FaqItems>({
  question: { type: String },
  answer: { type: String },
});

const categorySchema = new Schema<Category>({
  title: { type: String },
});

const BannerImageSchema = new Schema<BannerImage>({
  public_id: { type: String },
  url: { type: String },
});

const layoutSchema = new Schema<Layout>(
  {
    type: { type: String },
    faq: [faqSchema],
    categories: [categorySchema],
    banner: {
      image: BannerImageSchema,
      title: { type: String },
      subtitle: { type: String },
    },
  },
  { timestamps: true }
);

const layoutModel: Model<Layout> = mongoose.model("Layout", layoutSchema);

export default layoutModel;
