import { z } from "zod";

export type GetReviewSchema = {
    UserName: string;
    NoOfStars: number;
    Comment: string;
}

export const UserReviewSchema = z.object({
    NoOfStars: z.string().refine((val) => !Number.isNaN(parseFloat(val)) && parseFloat(val) >= 1 && parseFloat(val) <= 5, "Rating should be a Number and between 1-5"),
    Comment: z.string().min(1, "Comment is required").min(10, "Comment Should has atleast 10 Characters!!!"),
});

export type UserReviewFormData = z.infer<typeof UserReviewSchema>
export type UserReviewSchema = UserReviewFormData & {
    Id: string;
}

export type GetReviewForUserSchema = {
    Review: UserReviewSchema | null;
    IsCreateApplicable: boolean;
    IsEditApplicable: boolean;
}