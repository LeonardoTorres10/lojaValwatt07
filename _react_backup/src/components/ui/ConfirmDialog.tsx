import * as Dialog from '@radix-ui/react-dialog';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  destructive?: boolean;
}

export default function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  onConfirm,
  destructive = false,
}: Props) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" />
        <Dialog.Content className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm focus:outline-none">
          <Dialog.Title className="font-display font-bold text-azul-800 text-xl mb-2">{title}</Dialog.Title>
          <Dialog.Description className="text-cinza-700 text-sm mb-6">{description}</Dialog.Description>
          <div className="flex gap-3 justify-end">
            <Dialog.Close asChild>
              <button className="px-5 py-2 rounded-xl border border-cinza-200 text-cinza-700 text-sm font-semibold hover:bg-cinza-50 transition-colors">
                {cancelLabel}
              </button>
            </Dialog.Close>
            <button
              onClick={() => { onConfirm(); onOpenChange(false); }}
              className={`px-5 py-2 rounded-xl text-sm font-bold transition-colors ${
                destructive
                  ? 'bg-red-500 text-white hover:bg-red-600'
                  : 'bg-azul-800 text-white hover:bg-azul-900'
              }`}
            >
              {confirmLabel}
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
