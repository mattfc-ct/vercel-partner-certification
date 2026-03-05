interface ApiResponse<T> {
  data: T;
  success: boolean;
}

export async function getData<T>(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET"
): Promise<T> {
  const response = await fetch(`${process.env.API_URL}${url}`, {
    method,
    headers: new Headers({
      "x-vercel-protection-bypass":
        process.env.API_VERCEL_PROTECTION_BYPASS_TOKEN ?? "",
    }),
  });

  const responseData = (await response.json()) as ApiResponse<T>;

  if (!responseData.success) {
    throw new Error(response.statusText);
  }

  return responseData.data;
}
