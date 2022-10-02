import { z } from "zod";

export const annualInterestSchema = z
  .number({ invalid_type_error: "半角数字を入力してください。" })
  .min(0.1, { message: "0.1以上の利率を入力してください。" })
  .max(100, { message: "100以下の利率を入力してください。" })
  .multipleOf(0.001, { message: "0.001単位で利率を入力してください。" });

export const yearsOfRepaymentSchema = z
  .number({ invalid_type_error: "半角数字を入力してください。" })
  .int("整数を入力してください。")
  .min(1, { message: "1年以上の期間入力してください。" })
  .max(50, { message: "50年以下の期間を入力してください。" });
