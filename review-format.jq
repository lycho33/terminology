"Project Layer: \(.project_layer | join(", "))",
"Code Recommendation:",
"",
(
  .code_recommendations
  | to_entries[]
  | "\(.key + 1). \(.value.description)\nFiles\n"
    + (
        if (.value.files | length) == 0
        then "  None"
        else (.value.files | map("  - " + .) | join("\n"))
        end
      )
    + "\n"
)
