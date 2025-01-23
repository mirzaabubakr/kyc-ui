import { useState } from "react";
import KYCForm from "../forms/KYCForm";
import { Button } from "../ui/button";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import * as Dialog from "@radix-ui/react-dialog";

export function AddKYCDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add Details</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Details</DialogTitle>
        </DialogHeader>
        <KYCForm setOpen={setOpen} />
      </DialogContent>
    </Dialog.Root>
  );
}
