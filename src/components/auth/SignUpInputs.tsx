import {Control, Controller, FieldErrors, FieldValues} from 'react-hook-form';
import {Translation} from 'react-i18next';
import {View, StyleSheet} from 'react-native';
import InputSection from './InputSection';
import {SignUpForm} from '../../types';
import {regexFormatHelper} from '../../utils';
import {MyDimensions} from '../../constants';

interface Props {
  control: Control<SignUpForm>;
  errors: FieldErrors<SignUpForm>;
}

export default function SignUpInputs({control, errors}: Props) {
  return (
    <View>
      <Controller
        name="username"
        control={control}
        rules={{
          required: true,
          minLength: 3,
        }}
        render={({field: {onChange, value}}) => (
          <Translation>
            {t => (
              <InputSection
                value={value}
                error={errors.username ? t('usenameInvalid') : undefined}
                onChangeText={onChange}
                icon="human"
                placeholder={t('placeholderUsername')}
              />
            )}
          </Translation>
        )}
      />
      <Controller
        name="phone"
        control={control}
        rules={{
          required: true,
          pattern: regexFormatHelper.regPhone,
        }}
        render={({field: {onChange, value}}) => (
          <Translation>
            {t => (
              <InputSection
                value={value}
                error={errors.phone ? t('phoneInvalid') : undefined}
                onChangeText={onChange}
                keyboardType="numeric"
                style={styles.inputMarginTop}
                icon="phone"
                placeholder={t('placeholderPhone')}
              />
            )}
          </Translation>
        )}
      />
      <Controller
        name="email"
        control={control}
        rules={{
          required: true,
          pattern: regexFormatHelper.regEmail,
        }}
        render={({field: {onChange, value}}) => (
          <Translation>
            {t => (
              <InputSection
                value={value}
                error={errors.email ? t('emailInvalid') : undefined}
                onChangeText={onChange}
                style={styles.inputMarginTop}
                icon="email"
                placeholder={t('placeholderEmail')}
              />
            )}
          </Translation>
        )}
      />
      <Controller
        name="password"
        control={control}
        rules={{
          required: true,
          pattern: regexFormatHelper.regPassword,
        }}
        render={({field: {onChange, value}}) => (
          <Translation>
            {t => (
              <InputSection
                value={value}
                error={errors.password ? t('passwordInvalid') : undefined}
                onChangeText={onChange}
                style={styles.inputMarginTop}
                icon="lock"
                placeholder={t('placeholderPassword')}
                isCanSecureText={true}
              />
            )}
          </Translation>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputMarginTop: {
    marginTop: MyDimensions.paddingMedium,
  },
});
