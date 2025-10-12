// components/LanguageToolResult.js

export default function LanguageToolResult({ response }) {
  const matches = response?.data?.matches ?? [];

  if (matches.length === 0) {
    return (
      <div className="p-4 border rounded bg-black-50 text-white-800">
        Aucun problème détecté.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {matches.map((match, i) => (
        <div key={i} className="space-y-1 p-4 border rounded bg-black-50 text-white-800">
          <p>
            <strong>Phrase:</strong> {match.sentence}
          </p>
          <p>
            <strong>Problème:</strong> {match.message}
          </p>
          {match.shortMessage && (
            <p>
              <strong>Court:</strong> {match.shortMessage}
            </p>
          )}
          <p>
            <strong>Suggestion(s):</strong>{" "}
            {match.replacements.map((r, j) => (
              <span key={j} className="px-2 py-1 bg-black-50 border rounded mx-1">
                {r.value}
              </span>
            ))}
          </p>
          <p className="text-sm text-gray-600">
            <em>{match.rule.description}</em> ({match.rule.category.name})
          </p>
        </div>
      ))}
    </div>
  );
}
