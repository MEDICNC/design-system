"use client";

export const Confirm = () => {
  const handleClick = () => {
    // @ts-ignore
    UIkit.modal
      .confirm({
        title: "제목",
        text: "Confirm 입니다.",
        confirmButtonText: "적용",
        cancelButtonText: "닫기",
      })
      .then(
        function () {
          console.log("확인 클릭");
        },
        function () {
          console.log("닫기 클릭");
        },
      );
  };
  return (
    <div>
      <button
        className="uk-btn uk-btn-fill uk-btn-primary"
        onClick={handleClick}
      >
        Confirm
      </button>
    </div>
  );
};

export const Alert = () => {
  const handleClick = () => {
    // @ts-ignore
    UIkit.modal.alert({ text: "Alert 입니다." }).then(function () {
      console.log("확인 클릭");
    });
  };
  return (
    <div>
      <button
        className="uk-btn uk-btn-fill uk-btn-primary"
        onClick={handleClick}
      >
        Alert
      </button>
    </div>
  );
};
