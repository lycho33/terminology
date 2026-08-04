export type Term = {
  name: string;
  definition?: string;
  diagram?: string;
};
export type UpdateFormProps = {
  onEditMode: (isEdit: boolean) => void;
};

export type CreateFormProps = {
  createTerm: (newTerm: string) => void;
  setTerm: (term: string) => void;
};

export type DeleteModalProps = {
  deleteErrorMessage: string | null;
  termName: string;
  handleConfirmDelete: () => void;
  isDeleting: boolean;
  handleCancelDelete: () => void;
};
