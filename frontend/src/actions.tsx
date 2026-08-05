import type { UpdateTermInput } from "./hooks";
import type { Term } from "./terms/types";

type TermResponse = {
  term: Term;
};

export type ApiError = Error & { status: number };

export const isApiError = (error: unknown): error is ApiError =>
  error instanceof Error &&
  "status" in error &&
  typeof error.status === "number";

const createApiError = (status: number, message: string): ApiError =>
  Object.assign(new Error(message), { name: "ApiError", status });

const getApiErrorMessage = async (
  response: Response,
  fallback: string,
): Promise<string> => {
  try {
    const errorResponse: unknown = await response.json();

    if (
      typeof errorResponse === "object" &&
      errorResponse !== null &&
      "detail" in errorResponse &&
      typeof errorResponse.detail === "string"
    ) {
      return errorResponse.detail;
    }
  } catch {
    // Use the fallback when the API does not return JSON.
  }

  return fallback;
};

// https://tanstack.com/query/latest/docs/framework/react/quick-start
export const getTerm = async (termName: string): Promise<Term> => {
  const response = await fetch(
    `http://localhost:8000/terms/${encodeURIComponent(termName)}`,
  );

  if (!response.ok) {
    throw createApiError(
      response.status,
      await getApiErrorMessage(response, "Term lookup failed. Try again."),
    );
  }

  return await response.json();
};

export const createTerm = async (term: {
  name: string;
  definition?: string;
  diagram?: string;
}): Promise<Term> => {
  const response = await fetch(`http://localhost:8000/terms/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: term.name,
      definition: term.definition,
      diagram: term.diagram,
    }),
  });

  if (!response.ok) {
    throw createApiError(
      response.status,
      await getApiErrorMessage(response, "Create failed. Try again."),
    );
  }

  return await response.json();
};

export const updateTerm = async (
  termInputs: UpdateTermInput,
): Promise<Term> => {
  const response = await fetch(
    `http://localhost:8000/terms/${encodeURIComponent(termInputs.term)}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: termInputs.newTerm,
        definition: termInputs.definition,
        diagram: termInputs.diagram,
      }),
    },
  );

  if (!response.ok) {
    throw createApiError(
      response.status,
      await getApiErrorMessage(response, "Update failed. Try again."),
    );
  }

  const terms: TermResponse = await response.json(); // Update this

  return terms.term;
};

type DeleteResponse = {
  name: string;
  result: unknown;
};

export const deleteTerm = async (termName: string): Promise<DeleteResponse> => {
  const response = await fetch(
    `http://localhost:8000/terms/${encodeURIComponent(termName)}`, // Adds space like "Docker%20registry" to make it URL friendly
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!response.ok) {
    throw createApiError(
      response.status,
      await getApiErrorMessage(response, "Delete failed. Try again."),
    );
  }

  return await response.json();
};
