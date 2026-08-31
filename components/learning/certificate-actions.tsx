import { ExternalLink, FileText, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CertificateActions({
  certificateUrl,
  verificationUrl,
}: {
  certificateUrl?: string;
  verificationUrl?: string;
}) {
  const hasCertificate = Boolean(certificateUrl);
  const hasVerification = Boolean(verificationUrl);

  if (!hasCertificate && !hasVerification) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-border px-3 py-1.5 text-xs font-medium text-muted-foreground">
        <Lock className="h-3.5 w-3.5" />
        Certificate link not added yet
      </span>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {hasCertificate ? (
        <Button asChild size="sm" variant="outline">
          <a href={certificateUrl} target="_blank" rel="noopener noreferrer">
            <FileText /> View Certificate
          </a>
        </Button>
      ) : (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-border px-3 py-1.5 text-xs font-medium text-muted-foreground">
          <Lock className="h-3.5 w-3.5" /> Certificate link not added yet
        </span>
      )}
      {hasVerification && (
        <Button asChild size="sm" variant="outline">
          <a href={verificationUrl} target="_blank" rel="noopener noreferrer">
            <ExternalLink /> Verify
          </a>
        </Button>
      )}
    </div>
  );
}
