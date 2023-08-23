#if IOS || ANDROID || MACCATALYST
using Microsoft.Maui.Graphics.Platform;
#elif WINDOWS
using Microsoft.Maui.Graphics.Win2D;
#endif
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Bobaloo.Hangman.Client.Drawables
{
    public class LoadImageDrawable : BindableObject, IDrawable
    {
        public static readonly BindableProperty ImageBytesProperty =
             BindableProperty.Create(nameof(ImageBytes), typeof(byte[]), typeof(LoadImageDrawable), default(byte[]));
        public byte[] ImageBytes
        {
            get => (byte[])GetValue(ImageBytesProperty);
            set => SetValue(ImageBytesProperty, value);
        }
        public void Draw(ICanvas canvas, RectF dirtyRect)
        {
            if (ImageBytes != null)
            {
                Microsoft.Maui.Graphics.IImage image;
                using (Stream stream = new MemoryStream(ImageBytes))
                {
#if IOS || ANDROID || MACCATALYST
                    // PlatformImage isn't currently supported on Windows.
                    image = PlatformImage.FromStream(stream, ImageFormat.Jpeg);
#elif WINDOWS
                image = new W2DImageLoadingService().FromStream(stream, ImageFormat.Jpeg);
#endif
                }

                if (image != null)
                {
                    canvas.DrawImage(image, 10, 10, image.Width, image.Height);
                }
            }
        }
    }
}
