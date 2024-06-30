import Image from 'next/image';

interface UserProps {}

export default async function UserPage({}: UserProps) {
  return (
    <div>
      <section className='user'>
        <div className='avatar'>
          <Image
            src={'/person.svg'}
            alt='Аватар пользователя'
            // layout='responsive'
            width={150}
            height={150}
          />
        </div>
        <div className='userInfo'>
          <div className='username'>user #228</div>
          <div className='userEmail'>sucker228@gmail.com</div>
        </div>
      </section>
      <section className='productBlock'>
        <h2 className='productTitle'>История</h2>
        <div className='products'></div>
      </section>
    </div>
  );
}
