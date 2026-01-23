import React from "react";
import { Link } from "../components/link";

const URL_REGEX = /(https?:\/\/[^\s\)]+)/g;
// 하이라이트 패턴: ==텍스트==
const HIGHLIGHT_REGEX = /(==.+?==)/g;

// 토스 스타일 컬러
// 링크: #3182f6 (파란색) - 클릭 가능한 요소
// 강조: 주황색 계열 - 정보의 중요성을 나타냄
const HIGHLIGHT_COLOR = "#FF6B35"; // 토스 스타일 주황색 (Accent Orange)

export const parseBold = (text: string): React.ReactNode[] => {
  // 먼저 URL을 찾아서 링크로 변환
  const urlParts: Array<{ type: "text" | "url"; content: string; url?: string }> = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  // NOTE: URL_REGEX is global (/g). Reset to avoid lastIndex leaking across calls.
  URL_REGEX.lastIndex = 0;

  while ((match = URL_REGEX.exec(text)) !== null) {
    if (match.index > lastIndex) {
      urlParts.push({
        type: "text",
        content: text.substring(lastIndex, match.index),
      });
    }
    urlParts.push({
      type: "url",
      content: match[1],
      url: match[1],
    });
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    urlParts.push({
      type: "text",
      content: text.substring(lastIndex),
    });
  }

  if (urlParts.length === 0) {
    urlParts.push({ type: "text", content: text });
  }

  // 각 부분을 처리 (볼드 텍스트, 수치, 일반 텍스트)
  const result: React.ReactNode[] = [];
  let keyIndex = 0;

  urlParts.forEach((part) => {
    if (part.type === "url") {
      result.push(
        <Link key={keyIndex++} href={part.url!} target="_blank" rel="noopener noreferrer">
          {part.content}
        </Link>
      );
    } else {
      // 볼드 텍스트와 하이라이트 처리
      const processText = (textPart: string) => {
        const processed: React.ReactNode[] = [];
        
        // 하이라이트 먼저 분리 (==텍스트==)
        const highlightSplit = textPart.split(HIGHLIGHT_REGEX);
        
        highlightSplit.forEach((highlightSegment) => {
          if (highlightSegment.startsWith("==") && highlightSegment.endsWith("==")) {
            // 하이라이트 텍스트
            const highlightContent = highlightSegment.slice(2, -2);
            processed.push(
              <span key={keyIndex++} style={{ color: HIGHLIGHT_COLOR, fontWeight: 600 }}>
                {highlightContent}
              </span>
            );
          } else if (highlightSegment) {
            // 볼드 텍스트 분리
            const boldSplit = highlightSegment.split(/(\*\*.+?\*\*)/g);
            
            boldSplit.forEach((segment) => {
              if (segment.startsWith("**") && segment.endsWith("**")) {
                processed.push(
                  <strong className="font-medium bg-gray-300/30" key={keyIndex++}>
                    {segment.slice(2, -2)}
                  </strong>
                );
              } else if (segment) {
                processed.push(<React.Fragment key={keyIndex++}>{segment}</React.Fragment>);
              }
            });
          }
        });

        return processed;
      };

      const processed = processText(part.content);
      result.push(...processed);
    }
  });

  return result;
};
