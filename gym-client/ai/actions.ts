import { generateObject } from "ai";
import { z } from "zod"

import { geminiFlashModel } from ".";

export async function generateNutritionPlan({
    bmi,
    goal,
    activityLevel,
}:{
    bmi: number;
    goal:  "giảm cân" | "giữ cân" | "tăng cân";
    activityLevel: "ít vận động" | "vận động trung bình" | "vận động nhiều";
}) {
    const { object: nutritionPlan } = await generateObject({
        model: geminiFlashModel,
        prompt: `Tạo khẩu phần ăn chi tiết cho người có chỉ số BMI là ${bmi}, mục tiêu là ${goal}, mức độ vận động là ${activityLevel}`,
        schema: z.object({
          calories: z.number().describe("Tổng lượng calo hàng ngày"),
          protein: z.string().describe("Gợi ý lượng protein mỗi ngày, ví dụ: '120g'"),
          carbs: z.string().describe("Gợi ý lượng carbohydrate mỗi ngày, ví dụ: '200g'"),
          fats: z.string().describe("Gợi ý lượng chất béo mỗi ngày, ví dụ: '70g'"),
          meals: z.array(
            z.object({
              name: z.string().describe("Tên bữa ăn, ví dụ: 'Bữa sáng'"),
              description: z.string().describe("Mô tả chi tiết món ăn"),
              calories: z.number().describe("Lượng calo của bữa ăn"),
            }),
          ).describe("Danh sách các bữa ăn trong ngày"),
        }),
      });
    
      return nutritionPlan;
    }
    
    export async function generateWorkoutPlan({
      bmi,
      goal,
      activityLevel,
      fitnessLevel,
    }: {
      bmi: number;
      goal: "giảm cân" | "giữ cân" | "tăng cơ";
      activityLevel: "ít vận động" | "vận động trung bình" | "vận động nhiều";
      fitnessLevel: "beginner" | "intermediate" | "advanced";
    }) {
      const { object: workoutPlan } = await generateObject({
        model: geminiFlashModel,
        prompt: `Tạo kế hoạch tập luyện 7 ngày dựa trên chỉ số BMI là ${bmi}, mục tiêu là ${goal}, mức độ vận động ${activityLevel}, trình độ tập là ${fitnessLevel}`,
        schema: z.object({
          weeklySchedule: z.array(
            z.object({
              day: z.string().describe("Thứ trong tuần, ví dụ: 'Thứ 2'"),
              activities: z.array(
                z.object({
                  name: z.string().describe("Tên bài tập, ví dụ: 'Chạy bộ'"),
                  duration: z.string().describe("Thời lượng tập, ví dụ: '30 phút'"),
                  notes: z.string().optional().describe("Ghi chú thêm nếu có"),
                }),
              ),
            }),
          ).describe("Lịch trình tập luyện cho 7 ngày"),
        }),
      });
    
      return workoutPlan;    
}
