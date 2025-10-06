"use client";

import React, { useState } from 'react';
import { Send, Bug, Lightbulb, MessageCircle } from 'lucide-react';
import type { FeedbackType, FeedbackFormData } from '../types/feedback';

export const FeedbackForm: React.FC = () => {
  const [formData, setFormData] = useState<FeedbackFormData>({
    type: 'bug',
    message: '',
    email: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const feedbackTypes: { value: FeedbackType; label: string; icon: React.ReactNode }[] = [
    { value: 'bug', label: '버그 제보', icon: <Bug className="w-5 h-5" /> },
    { value: 'feature', label: '기능 제안', icon: <Lightbulb className="w-5 h-5" /> },
    { value: 'other', label: '기타 의견', icon: <MessageCircle className="w-5 h-5" /> },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.message.trim()) {
      alert('피드백 내용을 입력해주세요.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userAgent: navigator.userAgent,
          url: window.location.href,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ type: 'bug', message: '', email: '' });
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } else {
        setSubmitStatus('error');
        alert(data.error || '피드백 전송에 실패했습니다.');
      }
    } catch (error) {
      setSubmitStatus('error');
      console.error('피드백 전송 오류:', error);
      alert('네트워크 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="rounded-2xl p-4 sm:p-6 shadow-sm"
      style={{
        backgroundColor: 'var(--color-background)',
        border: '1px solid var(--color-border)',
      }}
    >
      <div className="flex items-start gap-3 mb-4">
        <div
          className="p-2 rounded-lg flex-shrink-0"
          style={{ backgroundColor: 'var(--color-primary)' }}
        >
          <Send className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base sm:text-lg font-bold" style={{ color: 'var(--color-foreground)' }}>
            피드백 보내기
          </h3>
          <p className="text-xs sm:text-sm" style={{ color: 'var(--color-muted-foreground)' }}>
            버그 제보, 기능 제안, 의견을 자유롭게 보내주세요!
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* 피드백 타입 선택 */}
        <div>
          <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--color-foreground)' }}>
            피드백 유형
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {feedbackTypes.map((type) => (
              <button
                key={type.value}
                type="button"
                onClick={() => setFormData({ ...formData, type: type.value })}
                className="flex items-center justify-center gap-2 p-3 rounded-xl transition-all active:scale-95 sm:hover:scale-105"
                style={{
                  backgroundColor: formData.type === type.value ? 'var(--color-primary)' : 'var(--color-muted)',
                  color: formData.type === type.value ? 'white' : 'var(--color-foreground)',
                  border: formData.type === type.value ? 'none' : '1px solid var(--color-border)',
                }}
              >
                {type.icon}
                <span className="text-sm font-medium">{type.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 피드백 내용 */}
        <div>
          <label htmlFor="message" className="block text-sm font-semibold mb-2" style={{ color: 'var(--color-foreground)' }}>
            내용 <span style={{ color: 'var(--color-destructive)' }}>*</span>
          </label>
          <textarea
            id="message"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="피드백 내용을 자세히 작성해주세요...

예시:
• 버그: [페이지명]에서 [동작]을 하면 [문제] 발생
• 기능: [원하는 기능] 추가 요청
• 의견: 앱 사용 중 느낀 점"
            rows={6}
            maxLength={2000}
            required
            className="w-full p-3 rounded-xl resize-none text-sm sm:text-base"
            style={{
              backgroundColor: 'var(--color-background)',
              border: '1px solid var(--color-border)',
              color: 'var(--color-foreground)',
            }}
          />
          <div className="flex justify-between items-center text-xs mt-1" style={{ color: 'var(--color-muted-foreground)' }}>
            <span className="hidden sm:inline">최소 10자 이상 작성해주세요</span>
            <span className={formData.message.length > 1900 ? 'text-orange-500 font-medium' : ''}>
              {formData.message.length} / 2000
            </span>
          </div>
        </div>

        {/* 이메일 (선택) */}
        <div>
          <label htmlFor="email" className="block text-sm font-semibold mb-2" style={{ color: 'var(--color-foreground)' }}>
            이메일 <span className="text-xs font-normal" style={{ color: 'var(--color-muted-foreground)' }}>(선택)</span>
          </label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="example@email.com"
            className="w-full p-3 rounded-xl text-sm sm:text-base"
            style={{
              backgroundColor: 'var(--color-background)',
              border: '1px solid var(--color-border)',
              color: 'var(--color-foreground)',
            }}
          />
          <p className="text-xs mt-1" style={{ color: 'var(--color-muted-foreground)' }}>
            답변을 받고 싶으시면 이메일을 입력해주세요
          </p>
        </div>

        {/* 제출 버튼 */}
        <button
          type="submit"
          disabled={isSubmitting || !formData.message.trim() || formData.message.length < 10}
          className="w-full flex items-center justify-center gap-2 py-3 sm:py-3.5 rounded-xl font-semibold transition-all active:scale-95 sm:hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm text-sm sm:text-base"
          style={{
            backgroundColor: 'var(--color-primary)',
            color: 'white',
          }}
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>전송 중...</span>
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              <span>피드백 보내기</span>
            </>
          )}
        </button>

        {/* 안내 메시지 */}
        {!isSubmitting && formData.message.length > 0 && formData.message.length < 10 && (
          <p className="text-xs text-center" style={{ color: 'var(--color-muted-foreground)' }}>
            💡 최소 10자 이상 입력해주세요 (현재 {formData.message.length}자)
          </p>
        )}

        {/* 상태 메시지 */}
        {submitStatus === 'success' && (
          <div
            className="p-4 rounded-xl text-sm font-medium text-center animate-pulse"
            style={{
              backgroundColor: 'var(--color-green-100)',
              color: 'var(--color-green-700)',
              border: '1px solid var(--color-green-200)',
            }}
          >
            ✅ 피드백이 성공적으로 전송되었습니다!<br className="sm:hidden" />
            <span className="hidden sm:inline"> </span>소중한 의견 감사합니다. 🙏
          </div>
        )}
      </form>
    </div>
  );
};
