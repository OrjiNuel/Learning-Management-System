import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import cloudinary from "cloudinary";
import layoutModel from "../models/layout.model";

// Create layout
export const createLayout = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { type } = req.body;
      const isTypeExist = await layoutModel.findOne({ type });
      if (isTypeExist) {
        return next(new ErrorHandler(`${type} already exist`, 400));
      }
      if (type === "Banner") {
        const { image, title, subTitle } = req.body;
        const myCloud = await cloudinary.v2.uploader.upload(image, {
          folder: "Layout",
        });
        const banner = {
          image: { public_id: myCloud.public_id, url: myCloud.secure_url },
          title,
          subTitle,
        };
        await layoutModel.create(banner);
      }
      if (type === "FAQ") {
        const { faq } = req.body;

        // Because faq is an array
        const faqItems = await Promise.all(
          faq.map(async (item: any) => {
            return { question: item.question, answer: item.answer };
          })
        );

        await layoutModel.create({ type: "FAQ", faq: faqItems });
      }
      if (type === "Categories") {
        const { categories } = req.body;

        const categoryItems = await Promise.all(
          categories.map(async (item: any) => {
            return { title: item.title };
          })
        );

        await layoutModel.create({
          type: "Categories",
          categories: categoryItems,
        });
      }
      res.status(200).json({
        success: true,
        message: "Layout created successfully",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// Edit layout
export const editLayout = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { type } = req.body;

      if (type === "Banner") {
        const bannerData: any = await layoutModel.findOne({ type: "Banner" });
        const { image, title, subTitle } = req.body;
        if (bannerData) {
          await cloudinary.v2.uploader.destroy(bannerData.image.public_id);
        }
        const myCloud = await cloudinary.v2.uploader.upload(image, {
          folder: "Layout",
        });
        const banner = {
          type: "Banner",
          image: { public_id: myCloud.public_id, url: myCloud.secure_url },
          title,
          subTitle,
        };
        await layoutModel.findByIdAndUpdate(bannerData.id, { banner });
      }
      if (type === "FAQ") {
        const { faq } = req.body;
        const faqData = await layoutModel.findOne({
          type: "Categories",
        });
        // Because faq is an array
        const faqItems = await Promise.all(
          faq.map(async (item: any) => {
            return { question: item.question, answer: item.answer };
          })
        );

        await layoutModel.create(faqData?._id, { type: "FAQ", faq: faqItems });
      }
      if (type === "Categories") {
        const { categories } = req.body;
        const categoriesData = await layoutModel.findOne({
          type: "Categories",
        });
        const categoryItems = await Promise.all(
          categories.map(async (item: any) => {
            return { title: item.title };
          })
        );

        await layoutModel.findByIdAndUpdate(categoriesData?._id, {
          type: "Categories",
          categories: categoryItems,
        });
      }
      res.status(200).json({
        success: true,
        message: "Layout updated successfully",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// get layout
export const getLayoutByType = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { type } = req.body;
      const layout = await layoutModel.findOne({ type });
      res.status(200).json({
        success: true,
        layout,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
