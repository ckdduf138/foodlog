import { NextRequest, NextResponse } from 'next/server';

interface FeedbackRequest {
  type: 'bug' | 'feature' | 'other';
  message: string;
  email?: string;
  userAgent?: string;
  url?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: FeedbackRequest = await request.json();
    
    // 유효성 검사
    if (!body.message || body.message.trim().length === 0) {
      return NextResponse.json(
        { error: '피드백 내용을 입력해주세요.' },
        { status: 400 }
      );
    }

    if (body.message.length > 2000) {
      return NextResponse.json(
        { error: '피드백은 2000자를 초과할 수 없습니다.' },
        { status: 400 }
      );
    }

    // Discord Webhook URL 확인
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    if (!webhookUrl) {
      console.error('DISCORD_WEBHOOK_URL이 설정되지 않았습니다.');
      return NextResponse.json(
        { error: '피드백 전송 설정이 올바르지 않습니다.' },
        { status: 500 }
      );
    }

    // 피드백 타입별 이모지와 색상
    const typeConfig = {
      bug: { emoji: '🐛', color: 0xED4245, label: '버그 제보' },
      feature: { emoji: '💡', color: 0x5865F2, label: '기능 제안' },
      other: { emoji: '💬', color: 0x57F287, label: '기타 의견' },
    };

    const config = typeConfig[body.type];
    
    // Discord Embed 메시지 생성
    const embed = {
      title: `${config.emoji} ${config.label}`,
      description: body.message,
      color: config.color,
      fields: [
        ...(body.email ? [{ name: '이메일', value: body.email, inline: true }] : []),
        ...(body.url ? [{ name: '페이지', value: body.url, inline: true }] : []),
        ...(body.userAgent ? [{ name: 'User Agent', value: body.userAgent.slice(0, 100), inline: false }] : []),
      ],
      timestamp: new Date().toISOString(),
      footer: {
        text: 'FoodLog v1.0.0',
      },
    };

    // Discord Webhook 전송
    const discordResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'FoodLog Feedback',
        avatar_url: 'https://em-content.zobj.net/thumbs/120/apple/354/fork-and-knife-with-plate_1f37d-fe0f.png',
        embeds: [embed],
      }),
    });

    if (!discordResponse.ok) {
      console.error('Discord Webhook 전송 실패:', await discordResponse.text());
      return NextResponse.json(
        { error: '피드백 전송에 실패했습니다.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: '피드백이 전송되었습니다!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('피드백 API 오류:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
