"use client";

import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { useAppDispatch } from "@/hooks/redux-hooks";
import { useModal } from "@/hooks/use-modal-store";

import { editEvent } from "@/http/events/eventsAPI";
import { updateEvent } from "@/lib/features/events/eventsSlice";
import { AxiosError } from "axios";
import { CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { ErrorAlert } from "../ErrorAlert";

const formSchema = z.object({
    eventName: z
        .string()
        .min(1, { message: "Название мероприятия должно содержать минимум 1 символ"})
        .max(50, { message: "Название мероприятия не должно превышать 50 символов.",}),
    eventStartDate: z.date().optional(),
    eventEndDate: z.date().optional(),
});

export const EditEventModal = () => {
    const { isOpen, onClose, type, data } = useModal();
    const [error, setError] = useState("");

    const isModalOpen = isOpen && type === "editEvent";
    const dispatch = useAppDispatch();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema)
    });

    useEffect(() => {
        const event = data.event;
        if (event) {
            form.setValue("eventName", event.name || "");
            if (event.startDate) {
                const startDate = new Date(event.startDate);
                form.setValue("eventStartDate", startDate);
                const endtDate = new Date(event.endDate);
                form.setValue("eventEndDate", endtDate);
            }
        }
    }, [form, data.event, isOpen]);

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const response = await editEvent({
                id: data.event!.id,
                name: values.eventName!,
                startDate: values.eventStartDate ? format(values.eventStartDate, "yyyy-MM-dd") : undefined,
                endDate: values.eventEndDate ? format(values.eventEndDate, "yyyy-MM-dd") : undefined
            });

            dispatch(updateEvent(response.data));

            handleClose();
        } catch (error: AxiosError | any) {
            setError("Произошла ошибка при редактировании мероприятия.");
        }
    };

    const handleClose = () => {
        setError("")
        form.reset();
        onClose();
    };

    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader className="flex flex-col gap-y-2">
                    <DialogTitle>Редактрирование события</DialogTitle>
                    <DialogDescription>
                        Введите данные события.
                    </DialogDescription>
                    {error && <ErrorAlert error={error} />}
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="eventName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Название события</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="focus-visible:ring-0 focus-visible:ring-offset-0"
                                            placeholder="Название мероприятия..."
                                            disabled={isLoading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="eventStartDate"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Дата начала мероприятия</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-[240px] pl-3 text-left font-normal",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value ? (
                                                        format(field.value, "dd.MM.yyyy")
                                                    ) : (
                                                        <span>Выберите дату</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                disabled={() => false}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="eventEndDate"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Дата окончания мероприятия</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-[240px] pl-3 text-left font-normal",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value ? (
                                                        format(field.value, "dd.MM.yyyy")
                                                    ) : (
                                                        <span>Выберите дату</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                disabled={() => false}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button disabled={isLoading} type="submit">
                                Сохранить
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};
