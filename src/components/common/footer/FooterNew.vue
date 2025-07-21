<script setup>

</script>
<template>
    <div class="footerBox">
        <div></div>
        <div>
            <div class="footerContainer">
                <div>{{ $t('message.mianze') }}</div>
                <div>|</div>
                <div>{{ $t('message.wzasm') }}</div>
                <div>|</div>
                <div>{{ $t('message.siyin') }}</div>
                <div>|</div>
                <div>{{ $t('message.banquansuoyou') }}</div>
            </div>
            <div class="footerFooter">{{ $t('message.tishi') }}</div>
        </div>
    </div>
</template>
<style>
.footerBox {
    display: flex;
    justify-content: center;
    font-weight: 700;
    color: #666;
    padding: 2rem;

    >div:nth-child(1) {
        height: 3.4rem;
        border-left: 0.4rem solid #F7B334;
        margin-right: 5.3rem;
        margin-top: 2px;
    }
}

.footerContainer {
    width: 100%;
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.8rem;

    >div:nth-child(2) {
        margin: 0px 1rem;
    }

    >div:nth-child(4) {
        margin: 0px 1rem;
    }

    >div:nth-child(6) {
        margin: 0px 1rem;
    }

    @media screen and (min-width: 1024px) {
        >div:nth-child(2) {
            margin: 0px 1rem;
        }

        >div:nth-child(4) {
            margin: 0px 1rem;
        }

        >div:nth-child(6) {
            margin: 0px 1rem;
        }
    }
}

.footerFooter {
    text-align: center;
    font-size: 0.9rem;
}
</style>