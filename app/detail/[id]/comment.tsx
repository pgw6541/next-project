'use client'

import view from "./detail.module.scss"

export default function Comment() {

  return (
    <div className={view.comment_container}>
      {/* 댓글들 */}
      {
        <div className={view.comments}>
          작성된 한줄 평이 없습니다.
        </div>
      }

      {/* 한 줄 평 작성 */}
      <form action="/api/post/new" method="POST">
        <label>한 줄 평 작성</label>
        <input name="content" type="text" />
        <button type="submit">작성</button>
      </form>
    </div>
  )
}